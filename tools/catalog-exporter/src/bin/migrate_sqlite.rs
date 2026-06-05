use anyhow::{Context, Result};
use rusqlite::{params, Connection};
use std::env;
use std::fs;
use std::path::{Path, PathBuf};

#[derive(Debug)]
struct Migration {
    filename: String,
    path: PathBuf,
    sql: String,
    checksum: String,
}

fn main() -> Result<()> {
    dotenvy::dotenv().ok();

    let database_path = project_path(
        env::var("CATALOGUE_DB_PATH").unwrap_or_else(|_| "data/catalogue.sqlite".to_string()),
    );
    let migrations_dir = project_path(
        env::var("CATALOGUE_MIGRATIONS_DIR").unwrap_or_else(|_| "data/migrations".to_string()),
    );

    let mut conn = Connection::open(&database_path).with_context(|| {
        format!(
            "failed to open SQLite catalogue at {}",
            database_path.display()
        )
    })?;
    conn.execute_batch("PRAGMA foreign_keys = ON;")
        .context("failed to enable SQLite foreign keys")?;
    ensure_migrations_table(&conn)?;

    let migrations = load_migrations(&migrations_dir)?;
    let mut applied_count = 0;

    for migration in migrations {
        match migration_status(&conn, &migration)? {
            MigrationStatus::Applied => {}
            MigrationStatus::ChecksumMismatch { applied_checksum } => {
                anyhow::bail!(
                    "migration {} was already applied with checksum {}, but the file now has checksum {}",
                    migration.filename,
                    applied_checksum,
                    migration.checksum
                );
            }
            MigrationStatus::Pending => {
                apply_migration(&mut conn, &migration)?;
                applied_count += 1;
                println!("Applied {}", migration.filename);
            }
        }
    }

    if applied_count == 0 {
        println!("No pending SQLite migrations.");
    } else {
        println!("Applied {} SQLite migration(s).", applied_count);
    }

    Ok(())
}

enum MigrationStatus {
    Pending,
    Applied,
    ChecksumMismatch { applied_checksum: String },
}

fn ensure_migrations_table(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        r#"
        CREATE TABLE IF NOT EXISTS schema_migrations (
            filename TEXT PRIMARY KEY,
            checksum TEXT NOT NULL,
            applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        "#,
    )
    .context("failed to create schema_migrations table")
}

fn load_migrations(migrations_dir: &Path) -> Result<Vec<Migration>> {
    let mut migrations = Vec::new();

    for entry in fs::read_dir(migrations_dir)
        .with_context(|| format!("failed to read {}", migrations_dir.display()))?
    {
        let entry = entry?;
        let path = entry.path();
        if path.extension().and_then(|value| value.to_str()) != Some("sql") {
            continue;
        }

        let filename = path
            .file_name()
            .and_then(|value| value.to_str())
            .context("migration filename is not valid UTF-8")?
            .to_string();
        let sql = fs::read_to_string(&path)
            .with_context(|| format!("failed to read migration {}", path.display()))?;
        let checksum = checksum(&sql);

        migrations.push(Migration {
            filename,
            path,
            sql,
            checksum,
        });
    }

    migrations.sort_by(|left, right| left.filename.cmp(&right.filename));
    Ok(migrations)
}

fn migration_status(conn: &Connection, migration: &Migration) -> Result<MigrationStatus> {
    let mut stmt = conn
        .prepare("SELECT checksum FROM schema_migrations WHERE filename = ?1")
        .context("failed to prepare migration status query")?;
    let mut rows = stmt
        .query(params![migration.filename])
        .context("failed to query migration status")?;

    let Some(row) = rows.next().context("failed to read migration status")? else {
        return Ok(MigrationStatus::Pending);
    };

    let applied_checksum: String = row.get(0)?;
    if applied_checksum == migration.checksum {
        Ok(MigrationStatus::Applied)
    } else {
        Ok(MigrationStatus::ChecksumMismatch { applied_checksum })
    }
}

fn apply_migration(conn: &mut Connection, migration: &Migration) -> Result<()> {
    let tx = conn
        .transaction()
        .with_context(|| format!("failed to start transaction for {}", migration.filename))?;

    tx.execute_batch(&migration.sql)
        .with_context(|| format!("failed to apply {}", migration.path.display()))?;
    tx.execute(
        "INSERT INTO schema_migrations (filename, checksum) VALUES (?1, ?2)",
        params![migration.filename, migration.checksum],
    )
    .with_context(|| format!("failed to record {}", migration.filename))?;

    tx.commit()
        .with_context(|| format!("failed to commit {}", migration.filename))
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
