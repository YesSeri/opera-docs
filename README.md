# ariavault

Find free public-domain opera sheet music online.

The public site is migrating from Next.js to [Zola](https://www.getzola.org/), with a small Rust exporter that turns the version-controlled SQLite catalogue into static Zola content.

## Requirements

- Zola
- Rust
- Optional: a MariaDB/MySQL database when refreshing `data/catalogue.sqlite`

## Catalogue database

The public catalogue is stored in SQLite so it can be version controlled:

```text
data/catalogue.sqlite
data/catalogue.sql
```

Use `catalogue.sqlite` for the build tools. Use `catalogue.sql` as the reviewable text snapshot.

## Environment variables

The exporter accepts either a single connection URL:

```text
DB_CONNECTION_URL=mysql://user:password@host:port/database
```

or the split variables used by the legacy app:

```text
DB_URL=localhost
DB_PORT=3306
DB_USER=user
DB_PASS=password
DB_NAME=database
```

## Migrate MariaDB to SQLite

Run this when the MariaDB catalogue is the source you want to snapshot:

```bash
cd tools/catalog-exporter
cargo run --release --bin mariadb_to_sqlite
```

This writes:

- `data/catalogue.sqlite`
- `data/catalogue.sql`

## Apply SQLite migrations

Schema migrations live in `data/migrations` and are applied in filename order:

```bash
cd tools/catalog-exporter
cargo run --release --bin migrate_sqlite
```

Use migrations for schema changes such as adding tables, columns, indexes, or constraints. Normal catalogue edits can be made directly in SQLite and then committed with the updated SQL snapshot.

## Generate catalogue content

```bash
cd tools/catalog-exporter
cargo run --release --bin catalog-exporter
```

The exporter reads `data/catalogue.sqlite` by default and writes generated pages and data to:

- `content/composers/*`
- `content/operas/*`
- `content/pieces/*`
- `data/*.json`
- `static/search-index.json`

## Run locally

```bash
zola serve
```

## Build

```bash
zola build
```

The static site is written to `dist/`.

## Notes

Legacy Next.js files are still present during the migration, but the Zola path is now the intended public-site build. See `ZOLA_MIGRATION.md` for more detail.
