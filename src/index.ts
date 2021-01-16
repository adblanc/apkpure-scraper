import cheerio from "cheerio";
import fetch from "node-fetch";

const SELECTORS = {
  TITLE: ".title-like > h1:nth-child(1)",
  VERSION: "span[itemprop='version']",
  NOT_FOUND: ".p404",
} as const;

const getDetailsUrl = (appId: string) => {
  return `https://apkpure.com/fr/${appId}`;
};

const getDownloadUrl = (appId: string) => {
  return `${getDetailsUrl(appId)}/download`;
};

export default async (appId: string) => {
  const html = await (await fetch(getDetailsUrl(appId))).text();
  const $ = cheerio.load(html);

  if ($(SELECTORS.NOT_FOUND).text()) {
    throw new Error("App with this appId not found");
  }

  const version = $(SELECTORS.VERSION)
    .text()
    .trim();
  const title = $(SELECTORS.TITLE)
    .text()
    .trim();

  return {
    title,
    version,
    downloadLink: getDownloadUrl(appId),
  };
};
