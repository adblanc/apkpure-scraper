# apkpure-scrapper

Simple library for simple needs.

## Installation

```sh
# with yarn
yarn add apkpure-scrapper

# or with npm
npm install apkpure-scrapper
```

## Example

```typescript
import scrape from "apkpure-scrapper";

async function getInstagramDetails() {
  const { downloadLink, title, version } = await scrape(
    "com.instagram.android"
  );

  console.log(downloadLink, title, version);
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
