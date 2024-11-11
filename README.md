# ariavault - sheet music online

Find free sheet music online. View the site here [ariavault](https://www.ariavault.com)

## Authors

- [Henrik Zenkert](https://www.github.com/Yesseri)

## Installation

Install with npm

```bash
git clone https://github.com/YesSeri/opera-docs.git
npm install
```

You need to have a database to be able to run and build the site.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
DB_CONNECTION_URL=mysql://user:password@host:port/database
NEXT_PUBLIC_GA_ID=G-AB12AB12AB
```

## Build & Export

Run the export command in `package.json`. The pdfs should be located in the ./public/pdfs folder.

```
cd public_html
chmod -R 755 ./operadocs.com/_next/
ls ./operadocs.com | grep -v "pdfs" | xargs rm -rf
unzip ./out.zip -d ./operadocs.com

(optional)
rm -rf ./operadocs.com/*
cp -r ./wp-content/uploads/pdfsToBeAccessed ./operadocs.com/pdfs
```

## Roadmap

- Add music playback to the sheet music.

## Contributing

Contributions are always welcome!
