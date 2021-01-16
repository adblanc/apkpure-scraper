# apkpure-scraper

Simple library for simple needs.

## Installation

```sh
# with yarn
yarn add apkpure-scraper

# or with npm
npm install apkpure-scraper
```

## Example

```typescript
import scrape from "apkpure-scraper";

async function getInstagramDetails() {
  const { downloadLink, title, version, type } = await scrape(
    "com.instagram.android"
  );

  console.log(downloadLink, title, version, type);
}

getInstagramDetails();
```

## Tests

Tests are run using Jest<br/>

```sh
# with yarn
yarn test

# or with npm
npm run test
```
