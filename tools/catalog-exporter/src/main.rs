use anyhow::{Context, Result};
use rusqlite::Connection;
use serde::Serialize;
use std::collections::{HashMap, HashSet};
use std::env;
use std::fs;
use std::path::{Path, PathBuf};

#[derive(Debug, Clone, Serialize)]
struct Composer {
    id: u64,
    first_name: String,
    last_name: String,
}

#[derive(Debug, Clone, Serialize)]
struct Opera {
    id: u64,
    title: String,
    translation: String,
    composer_id: u64,
    composer_first_name: String,
    composer_last_name: String,
}

#[derive(Debug, Clone, Serialize)]
struct Piece {
    id: u64,
    title: String,
    description: Option<String>,
    file_title: String,
    piece_type: String,
    placement: Option<u64>,
    next_id: Option<u64>,
    prev_id: Option<u64>,
    opera_id: u64,
    opera: String,
    composer_id: u64,
    composer_first_name: String,
    composer_last_name: String,
}

#[derive(Debug, Serialize)]
struct SearchItem {
    title: String,
    url: String,
    category: String,
}

fn main() -> Result<()> {
    dotenvy::dotenv().ok();

    let database_path = project_path(
        env::var("CATALOGUE_DB_PATH").unwrap_or_else(|_| "data/catalogue.sqlite".to_string()),
    );
    let conn = Connection::open(&database_path).with_context(|| {
        format!(
            "failed to open SQLite catalogue at {}",
            database_path.display()
        )
    })?;

    clean_generated_content()?;

    let composers = load_publishable_composers(&conn)?;
    let operas = load_operas(&conn)?;
    let pieces = load_pieces(&conn)?;
    let ordered_pieces = order_all_pieces(&operas, &pieces);

    write_json("data/composers.json", &composers)?;
    write_json("data/operas.json", &operas)?;
    write_json("data/pieces.json", &ordered_pieces)?;

    write_composer_pages(&composers)?;
    write_opera_pages(&operas)?;
    write_piece_pages(&ordered_pieces)?;
    write_arias_json(&ordered_pieces)?;
    write_search_index(&composers, &operas, &ordered_pieces)?;

    println!(
        "Exported {} composers, {} operas, and {} pieces.",
        composers.len(),
        operas.len(),
        pieces.len()
    );

    Ok(())
}

fn load_publishable_composers(conn: &Connection) -> Result<Vec<Composer>> {
    let mut stmt = conn
        .prepare(
            r#"SELECT c.id, c.first_name, c.last_name
           FROM composers AS c
           WHERE EXISTS (
               SELECT 1
               FROM operas AS o
               INNER JOIN pieces AS p ON p.opera_id = o.id
               WHERE o.composer_id = c.id
           )
           ORDER BY c.last_name, c.first_name"#,
        )
        .context("failed to prepare composer query")?;

    let rows = stmt
        .query_map([], |row| {
            Ok(Composer {
                id: row.get(0)?,
                first_name: row.get(1)?,
                last_name: row.get(2)?,
            })
        })
        .context("failed to load composers")?;

    rows.collect::<rusqlite::Result<Vec<_>>>()
        .context("failed to read composers")
}

fn load_operas(conn: &Connection) -> Result<Vec<Opera>> {
    let mut stmt = conn
        .prepare(
            r#"SELECT o.id, o.name, o.translation, c.id, c.first_name, c.last_name
           FROM operas AS o
           INNER JOIN composers AS c ON c.id = o.composer_id
           ORDER BY o.name"#,
        )
        .context("failed to prepare opera query")?;

    let rows = stmt
        .query_map([], |row| {
            Ok(Opera {
                id: row.get(0)?,
                title: row.get(1)?,
                translation: row.get(2)?,
                composer_id: row.get(3)?,
                composer_first_name: row.get(4)?,
                composer_last_name: row.get(5)?,
            })
        })
        .context("failed to load operas")?;

    rows.collect::<rusqlite::Result<Vec<_>>>()
        .context("failed to read operas")
}

fn load_pieces(conn: &Connection) -> Result<Vec<Piece>> {
    let mut stmt = conn
        .prepare(
            r#"SELECT p.id, p.title, p.description, p.file_title, p.type,
                  p.placement, p.next_id, p.prev_id, o.id, o.name, c.id, c.first_name, c.last_name
           FROM pieces AS p
           INNER JOIN operas AS o ON p.opera_id = o.id
           INNER JOIN composers AS c ON o.composer_id = c.id
           ORDER BY o.name, p.id"#,
        )
        .context("failed to prepare piece query")?;

    let rows = stmt
        .query_map([], |row| {
            Ok(Piece {
                id: row.get(0)?,
                title: row.get(1)?,
                description: row.get(2)?,
                file_title: row.get(3)?,
                piece_type: row.get(4)?,
                placement: row.get(5)?,
                next_id: row.get(6)?,
                prev_id: row.get(7)?,
                opera_id: row.get(8)?,
                opera: row.get(9)?,
                composer_id: row.get(10)?,
                composer_first_name: row.get(11)?,
                composer_last_name: row.get(12)?,
            })
        })
        .context("failed to load pieces")?;

    rows.collect::<rusqlite::Result<Vec<_>>>()
        .context("failed to read pieces")
}

fn clean_generated_content() -> Result<()> {
    for dir in ["content/composers", "content/operas", "content/pieces"] {
        let path = project_path(dir);
        if !path.exists() {
            fs::create_dir_all(&path)?;
        }

        for entry in fs::read_dir(&path)? {
            let entry = entry?;
            if entry.file_type()?.is_dir() {
                fs::remove_dir_all(entry.path())?;
            }
        }
    }

    Ok(())
}

fn write_composer_pages(composers: &[Composer]) -> Result<()> {
    for composer in composers {
        let image = format!(
            "composerPics/{}.jpeg",
            composer.last_name.replace(' ', "").to_lowercase()
        );
        let body = format!(
            "+++\ntitle = {title:?}\ntemplate = \"composer.html\"\n[extra]\ncomposer_id = {composer_id}\nfirst_name = {first:?}\nlast_name = {last:?}\nimage = {image:?}\n+++\n",
            title = format!("{} {}", composer.first_name, composer.last_name),
            composer_id = composer.id,
            first = composer.first_name,
            last = composer.last_name,
            image = image,
        );

        write_file(format!("content/composers/{}/index.md", composer.id), body)?;
    }

    Ok(())
}

fn write_opera_pages(operas: &[Opera]) -> Result<()> {
    for opera in operas {
        let body = format!(
            "+++\ntitle = {title:?}\ntemplate = \"opera.html\"\n[extra]\nopera_id = {opera_id}\ntranslation = {translation:?}\ncomposer_id = {composer_id}\ncomposer_first_name = {first:?}\ncomposer_last_name = {last:?}\n+++\n",
            title = opera.title,
            opera_id = opera.id,
            translation = opera.translation,
            composer_id = opera.composer_id,
            first = opera.composer_first_name,
            last = opera.composer_last_name,
        );

        write_file(format!("content/operas/{}/index.md", opera.id), body)?;
    }

    Ok(())
}

fn write_piece_pages(pieces: &[Piece]) -> Result<()> {
    for piece in pieces {
        let pdf_url = format!("/pdfs/{}", encode_pdf_path(&piece.file_title));
        let body = format!(
            "+++\ntitle = {title:?}\ntemplate = \"piece.html\"\n[extra]\npiece_type = {piece_type:?}\nplacement = {placement}\nfile_title = {file_title:?}\npdf_url = {pdf_url:?}\nopera = {opera:?}\nopera_id = {opera_id}\ncomposer_id = {composer_id}\ncomposer_first_name = {first:?}\ncomposer_last_name = {last:?}\nprev_id = {prev_id}\nnext_id = {next_id}\n+++\n\n{content}\n",
            title = piece.title,
            piece_type = piece.piece_type,
            placement = option_number(piece.placement),
            file_title = piece.file_title,
            pdf_url = pdf_url,
            opera = piece.opera,
            opera_id = piece.opera_id,
            composer_id = piece.composer_id,
            first = piece.composer_first_name,
            last = piece.composer_last_name,
            prev_id = option_number(piece.prev_id),
            next_id = option_number(piece.next_id),
            content = piece.description.clone().unwrap_or_default(),
        );

        write_file(format!("content/pieces/{}/index.md", piece.id), body)?;
    }

    Ok(())
}

fn write_arias_json(pieces: &[Piece]) -> Result<()> {
    let arias: Vec<_> = pieces
        .iter()
        .filter(|piece| piece.piece_type == "aria")
        .map(|piece| {
            serde_json::json!({
                "id": piece.id,
                "title": piece.title,
                "placement": piece.placement,
                "opera_id": piece.opera_id,
                "opera": piece.opera,
                "composer_id": piece.composer_id,
                "composer_first_name": piece.composer_first_name,
                "composer_last_name": piece.composer_last_name,
            })
        })
        .collect();

    write_json("data/arias.json", &arias)
}

fn write_search_index(composers: &[Composer], operas: &[Opera], pieces: &[Piece]) -> Result<()> {
    let mut items = Vec::new();

    for piece in pieces {
        items.push(SearchItem {
            title: piece.title.clone(),
            url: format!("/pieces/{}/", piece.id),
            category: "pieces".to_string(),
        });
    }

    for opera in operas {
        items.push(SearchItem {
            title: opera.title.clone(),
            url: format!("/operas/{}/", opera.id),
            category: "operas".to_string(),
        });
    }

    for composer in composers {
        items.push(SearchItem {
            title: format!("{} {}", composer.first_name, composer.last_name),
            url: format!("/composers/{}/", composer.id),
            category: "composers".to_string(),
        });
    }

    write_json("static/search-index.json", &items)
}

fn order_pieces(pieces: Vec<Piece>) -> Vec<Piece> {
    let by_id: HashMap<u64, Piece> = pieces
        .iter()
        .map(|piece| (piece.id, piece.clone()))
        .collect();
    let first = pieces
        .iter()
        .find(|piece| piece.prev_id.is_none())
        .or_else(|| pieces.first());

    let Some(first) = first else {
        return Vec::new();
    };

    let mut ordered = Vec::new();
    let mut seen = HashSet::new();
    let mut current = Some(first.clone());

    while let Some(piece) = current {
        if !seen.insert(piece.id) {
            break;
        }

        let next_id = piece.next_id;
        ordered.push(piece);

        current = next_id.and_then(|id| by_id.get(&id).cloned());
    }

    for piece in pieces {
        if !seen.contains(&piece.id) {
            ordered.push(piece);
        }
    }

    ordered
}

fn order_all_pieces(operas: &[Opera], pieces: &[Piece]) -> Vec<Piece> {
    let mut ordered = Vec::new();

    for opera in operas {
        let opera_pieces = pieces
            .iter()
            .filter(|piece| piece.opera_id == opera.id)
            .cloned()
            .collect();
        ordered.extend(order_pieces(opera_pieces));
    }

    ordered
}

fn encode_pdf_path(path: &str) -> String {
    path.replace('\\', "/")
        .split('/')
        .map(percent_encode_segment)
        .collect::<Vec<_>>()
        .join("/")
}

fn percent_encode_segment(segment: &str) -> String {
    let mut encoded = String::new();
    for byte in segment.as_bytes() {
        match byte {
            b'A'..=b'Z' | b'a'..=b'z' | b'0'..=b'9' | b'-' | b'_' | b'.' | b'~' => {
                encoded.push(*byte as char)
            }
            _ => encoded.push_str(&format!("%{:02X}", byte)),
        }
    }
    encoded
}

fn option_number(value: Option<u64>) -> String {
    value
        .map(|number| number.to_string())
        .unwrap_or_else(|| "false".to_string())
}

fn write_json(path: impl AsRef<Path>, value: &impl Serialize) -> Result<()> {
    let json = serde_json::to_string_pretty(value)?;
    write_file(path, format!("{}\n", json))
}

fn write_file(path: impl AsRef<Path>, contents: String) -> Result<()> {
    let path = project_path(path.as_ref());
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)?;
    }
    fs::write(&path, contents).with_context(|| format!("failed to write {}", path.display()))
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
