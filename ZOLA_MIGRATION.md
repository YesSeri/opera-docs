# Zola migration

This repository now has a Zola static-site implementation for the public ariavault catalogue.

## Install tools

Install Zola from <https://www.getzola.org/documentation/getting-started/installation/>.

The public catalogue is stored as SQLite:

```text
data/catalogue.sqlite
data/catalogue.sql
```

If you need to refresh it from MariaDB:

```bash
cd tools/catalog-exporter
cargo run --release --bin mariadb_to_sqlite
```

The static content exporter is a small Rust CLI:

```bash
cd tools/catalog-exporter
cargo run --release --bin catalog-exporter
```

SQLite schema migrations live in `data/migrations`:

```bash
cd tools/catalog-exporter
cargo run --release --bin migrate_sqlite
```

The MariaDB-to-SQLite migration command accepts either `DB_CONNECTION_URL` or the existing split variables:

```text
DB_URL
DB_USER
DB_PASS
DB_NAME
DB_PORT
```

## Build the site

From the repository root:

```bash
zola serve
zola build
```

Zola writes the static site to `dist/`. This avoids clobbering the legacy Next.js `public/` directory while the migration is in progress.

## Content flow

```text
MySQL database
  -> tools/catalog-exporter --bin mariadb_to_sqlite
  -> data/catalogue.sqlite
  -> tools/catalog-exporter --bin migrate_sqlite
  -> tools/catalog-exporter --bin catalog-exporter
  -> content/composers/*
  -> content/operas/*
  -> content/pieces/*
  -> data/*.json
  -> static/search-index.json
  -> zola build
  -> static HTML/CSS/JS
```

The generated public pages are:

- `/`
- `/operas/`
- `/operas/<id>/`
- `/composers/`
- `/composers/<id>/`
- `/arias/`
- `/pieces/`
- `/pieces/<id>/`
- `/about/`
- `/contact/`

## Dynamic features later

Keep the public repertoire catalogue static. Add dynamic features such as saved lists, accounts, and teacher assignments as a separate API later, for example with Axum.
