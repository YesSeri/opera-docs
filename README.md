# operadocs - sheet music online

Find free sheet music online. View the site here [operadocs](https://www.operadocs.com)

## Authors

- [Henrik Zenkert](https://www.github.com/Yesseri)

## Installation

Install with npm

```bash
git clone https://github.com/YesSeri/opera-docs.git
npm install
```

You need to have a database to be able to run and build the site.

## Contributing

Contributions are always welcome!

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
DB_CONNECTION_URL=mysql://user:password@host:port/database
NEXT_PUBLIC_GA_ID=G-AB12AB12AB
```

## Build & Export

Run the export command in `package.json`. The pdfs should be located in the ./public/pdfs folder.

## Roadmap

- Add music playback to the sheet music.
