use anyhow::{Context, Result};
use mysql::prelude::*;
use mysql::{Opts, Pool};
use rusqlite::{params, Connection};
use std::env;
use std::fs;
use std::path::{Path, PathBuf};

#[derive(Debug, Clone)]
struct Composer {
    id: i64,
    first_name: String,
    last_name: String,
}

#[derive(Debug, Clone)]
struct Opera {
    id: i64,
    name: String,
    translation: String,
    composer_id: i64,
}

#[derive(Debug, Clone)]
struct Piece {
    id: i64,
    title: String,
    description: String,
    file_title: String,
    piece_type: String,
    placement: Option<i64>,
    next_id: Option<i64>,
    prev_id: Option<i64>,
    opera_id: i64,
}

fn main() -> Result<()> {
    dotenvy::dotenv().ok();

    let sqlite_path = project_path(
        env::var("CATALOGUE_DB_PATH").unwrap_or_else(|_| "data/catalogue.sqlite".to_string()),
    );
    let snapshot_path = project_path(
        env::var("CATALOGUE_SQL_PATH").unwrap_or_else(|_| "data/catalogue.sql".to_string()),
    );
    let initial_migration_sql =
        fs::read_to_string(project_path("data/migrations/0001_initial_schema.sql"))
            .context("failed to read baseline SQLite migration")?;
    let initial_migration_checksum = checksum(&initial_migration_sql);

    let source_url = database_url()?;
    let opts = Opts::from_url(&source_url).context("invalid MariaDB connection URL")?;
    let pool = Pool::new(opts).context("failed to create MariaDB pool")?;
    let mut source = pool.get_conn().context("failed to connect to MariaDB")?;

    let composers = load_composers(&mut source)?;
    let operas = load_operas(&mut source)?;
    let pieces = load_pieces(&mut source)?;

    write_sqlite(
        &sqlite_path,
        &composers,
        &operas,
        &pieces,
        &initial_migration_checksum,
    )?;
    write_snapshot(
        &snapshot_path,
        &composers,
        &operas,
        &pieces,
        &initial_migration_checksum,
    )?;

    println!(
        "Migrated {} composers, {} operas, and {} pieces to {}.",
        composers.len(),
        operas.len(),
        pieces.len(),
        sqlite_path.display()
    );
    println!(
        "Wrote reviewable SQL snapshot to {}.",
        snapshot_path.display()
    );

    Ok(())
}

fn database_url() -> Result<String> {
    if let Ok(url) = env::var("DB_CONNECTION_URL") {
        return Ok(url);
    }

    let host = env::var("DB_URL").context("DB_URL or DB_CONNECTION_URL must be set")?;
    let user = env::var("DB_USER").context("DB_USER must be set")?;
    let pass = env::var("DB_PASS").context("DB_PASS must be set")?;
    let name = env::var("DB_NAME").context("DB_NAME must be set")?;
    let port = env::var("DB_PORT").unwrap_or_else(|_| "3306".to_string());

    Ok(format!(
        "mysql://{}:{}@{}:{}/{}",
        user, pass, host, port, name
    ))
}

fn load_composers(conn: &mut mysql::PooledConn) -> Result<Vec<Composer>> {
    conn.query_map(
        r#"SELECT id, COALESCE(first_name, ''), COALESCE(last_name, '')
           FROM composers
           ORDER BY id"#,
        |(id, first_name, last_name)| Composer {
            id,
            first_name,
            last_name,
        },
    )
    .context("failed to load composers from MariaDB")
}

fn load_operas(conn: &mut mysql::PooledConn) -> Result<Vec<Opera>> {
    conn.query_map(
        r#"SELECT id, COALESCE(name, ''), COALESCE(translation, ''), composer_id
           FROM operas
           ORDER BY id"#,
        |(id, name, translation, composer_id)| Opera {
            id,
            name,
            translation,
            composer_id,
        },
    )
    .context("failed to load operas from MariaDB")
}

fn load_pieces(conn: &mut mysql::PooledConn) -> Result<Vec<Piece>> {
    conn.query_map(
        r#"SELECT id, COALESCE(title, ''), COALESCE(description, ''),
                  COALESCE(file_title, ''), COALESCE(type, ''),
                  placement, next_id, prev_id, opera_id
           FROM pieces
           ORDER BY id"#,
        |(
            id,
            title,
            description,
            file_title,
            piece_type,
            placement,
            next_id,
            prev_id,
            opera_id,
        )| Piece {
            id,
            title,
            description,
            file_title,
            piece_type,
            placement,
            next_id,
            prev_id,
            opera_id,
        },
    )
    .context("failed to load pieces from MariaDB")
}

fn write_sqlite(
    sqlite_path: &Path,
    composers: &[Composer],
    operas: &[Opera],
    pieces: &[Piece],
    initial_migration_checksum: &str,
) -> Result<()> {
    if let Some(parent) = sqlite_path.parent() {
        fs::create_dir_all(parent)?;
    }
    if sqlite_path.exists() {
        fs::remove_file(sqlite_path)?;
    }

    let mut conn = Connection::open(sqlite_path)
        .with_context(|| format!("failed to create SQLite database {}", sqlite_path.display()))?;

    conn.execute_batch(
        r#"
        PRAGMA foreign_keys = ON;
        PRAGMA journal_mode = WAL;

        CREATE TABLE composers (
            id INTEGER PRIMARY KEY,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL
        );

        CREATE TABLE operas (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            translation TEXT NOT NULL DEFAULT '',
            composer_id INTEGER NOT NULL REFERENCES composers(id) ON UPDATE CASCADE ON DELETE RESTRICT DEFERRABLE INITIALLY DEFERRED
        );

        CREATE TABLE pieces (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL DEFAULT '',
            file_title TEXT NOT NULL,
            type TEXT NOT NULL,
            placement INTEGER,
            next_id INTEGER REFERENCES pieces(id) ON UPDATE CASCADE ON DELETE SET NULL DEFERRABLE INITIALLY DEFERRED,
            prev_id INTEGER REFERENCES pieces(id) ON UPDATE CASCADE ON DELETE SET NULL DEFERRABLE INITIALLY DEFERRED,
            opera_id INTEGER NOT NULL REFERENCES operas(id) ON UPDATE CASCADE ON DELETE RESTRICT DEFERRABLE INITIALLY DEFERRED
        );

        CREATE INDEX idx_operas_composer_id ON operas(composer_id);
        CREATE INDEX idx_pieces_opera_id ON pieces(opera_id);
        CREATE INDEX idx_pieces_type ON pieces(type);
        CREATE INDEX idx_pieces_next_id ON pieces(next_id);
        CREATE INDEX idx_pieces_prev_id ON pieces(prev_id);

        CREATE TABLE schema_migrations (
            filename TEXT PRIMARY KEY,
            checksum TEXT NOT NULL,
            applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        "#,
    )
    .context("failed to create SQLite schema")?;

    let tx = conn
        .transaction()
        .context("failed to start SQLite transaction")?;
    {
        let mut insert_composer =
            tx.prepare("INSERT INTO composers (id, first_name, last_name) VALUES (?1, ?2, ?3)")?;
        for composer in composers {
            insert_composer.execute(params![
                composer.id,
                composer.first_name,
                composer.last_name
            ])?;
        }

        let mut insert_opera = tx.prepare(
            "INSERT INTO operas (id, name, translation, composer_id) VALUES (?1, ?2, ?3, ?4)",
        )?;
        for opera in operas {
            insert_opera.execute(params![
                opera.id,
                opera.name,
                opera.translation,
                opera.composer_id
            ])?;
        }

        let mut insert_piece = tx.prepare(
            r#"INSERT INTO pieces
               (id, title, description, file_title, type, placement, next_id, prev_id, opera_id)
               VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)"#,
        )?;
        for piece in pieces {
            insert_piece.execute(params![
                piece.id,
                piece.title,
                piece.description,
                piece.file_title,
                piece.piece_type,
                piece.placement,
                piece.next_id,
                piece.prev_id,
                piece.opera_id
            ])?;
        }
    }
    tx.commit().context("failed to commit SQLite migration")?;

    conn.execute(
        "INSERT INTO schema_migrations (filename, checksum) VALUES (?1, ?2)",
        params!["0001_initial_schema.sql", initial_migration_checksum],
    )
    .context("failed to record baseline SQLite migration")?;

    let violations: i64 = conn
        .query_row("SELECT COUNT(*) FROM pragma_foreign_key_check", [], |row| {
            row.get(0)
        })
        .context("failed to run SQLite foreign key check")?;
    if violations != 0 {
        anyhow::bail!("SQLite foreign key check found {} violations", violations);
    }

    conn.execute_batch("PRAGMA wal_checkpoint(TRUNCATE); VACUUM;")
        .context("failed to compact SQLite database")?;

    Ok(())
}

fn write_snapshot(
    snapshot_path: &Path,
    composers: &[Composer],
    operas: &[Opera],
    pieces: &[Piece],
    initial_migration_checksum: &str,
) -> Result<()> {
    if let Some(parent) = snapshot_path.parent() {
        fs::create_dir_all(parent)?;
    }

    let mut sql = String::new();
    sql.push_str(
        "-- Generated from MariaDB by tools/catalog-exporter/src/bin/mariadb_to_sqlite.rs\n",
    );
    sql.push_str("PRAGMA foreign_keys = ON;\nBEGIN TRANSACTION;\n\n");
    sql.push_str(
        r#"CREATE TABLE composers (
    id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);

CREATE TABLE operas (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    translation TEXT NOT NULL DEFAULT '',
    composer_id INTEGER NOT NULL REFERENCES composers(id) ON UPDATE CASCADE ON DELETE RESTRICT DEFERRABLE INITIALLY DEFERRED
);

CREATE TABLE pieces (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    file_title TEXT NOT NULL,
    type TEXT NOT NULL,
    placement INTEGER,
    next_id INTEGER REFERENCES pieces(id) ON UPDATE CASCADE ON DELETE SET NULL DEFERRABLE INITIALLY DEFERRED,
    prev_id INTEGER REFERENCES pieces(id) ON UPDATE CASCADE ON DELETE SET NULL DEFERRABLE INITIALLY DEFERRED,
    opera_id INTEGER NOT NULL REFERENCES operas(id) ON UPDATE CASCADE ON DELETE RESTRICT DEFERRABLE INITIALLY DEFERRED
);

"#,
    );

    for composer in composers {
        sql.push_str(&format!(
            "INSERT INTO composers (id, first_name, last_name) VALUES ({}, {}, {});\n",
            composer.id,
            sql_string(&composer.first_name),
            sql_string(&composer.last_name)
        ));
    }

    sql.push('\n');
    for opera in operas {
        sql.push_str(&format!(
            "INSERT INTO operas (id, name, translation, composer_id) VALUES ({}, {}, {}, {});\n",
            opera.id,
            sql_string(&opera.name),
            sql_string(&opera.translation),
            opera.composer_id
        ));
    }

    sql.push('\n');
    for piece in pieces {
        sql.push_str(&format!(
            "INSERT INTO pieces (id, title, description, file_title, type, placement, next_id, prev_id, opera_id) VALUES ({}, {}, {}, {}, {}, {}, {}, {}, {});\n",
            piece.id,
            sql_string(&piece.title),
            sql_string(&piece.description),
            sql_string(&piece.file_title),
            sql_string(&piece.piece_type),
            sql_optional_i64(piece.placement),
            sql_optional_i64(piece.next_id),
            sql_optional_i64(piece.prev_id),
            piece.opera_id
        ));
    }

    sql.push_str(
        r#"
CREATE INDEX idx_operas_composer_id ON operas(composer_id);
CREATE INDEX idx_pieces_opera_id ON pieces(opera_id);
CREATE INDEX idx_pieces_type ON pieces(type);
CREATE INDEX idx_pieces_next_id ON pieces(next_id);
CREATE INDEX idx_pieces_prev_id ON pieces(prev_id);

CREATE TABLE schema_migrations (
    filename TEXT PRIMARY KEY,
    checksum TEXT NOT NULL,
    applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
"#,
    );
    sql.push_str(&format!(
        "INSERT INTO schema_migrations (filename, checksum) VALUES ('0001_initial_schema.sql', {});\n",
        sql_string(initial_migration_checksum)
    ));
    sql.push_str("\nCOMMIT;\n");

    fs::write(snapshot_path, sql)
        .with_context(|| format!("failed to write {}", snapshot_path.display()))
}

fn sql_string(value: &str) -> String {
    format!("'{}'", value.replace('\'', "''"))
}

fn sql_optional_i64(value: Option<i64>) -> String {
    value
        .map(|value| value.to_string())
        .unwrap_or_else(|| "NULL".to_string())
}

fn checksum(value: &str) -> String {
    let mut hash = 0xcbf29ce484222325u64;
    for byte in value.as_bytes() {
        hash ^= u64::from(*byte);
        hash = hash.wrapping_mul(0x100000001b3);
    }
    format!("{hash:016x}")
}

fn project_path(path: impl AsRef<Path>) -> PathBuf {
    let path = path.as_ref();
    if path.is_absolute() {
        return path.to_path_buf();
    }

    Path::new(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .and_then(Path::parent)
        .expect("catalog-exporter should live in tools/catalog-exporter")
        .join(path)
}
