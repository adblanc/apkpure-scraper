import cheerio from "cheerio";
import fetch from "node-fetch";

const SELECTORS = {
  TITLE: ".title-like > h1:nth-child(1)",
  VERSION: "span[itemprop='version']",
  DOWNLOAD_BTN: ".ny-down > .da",
  NOT_FOUND: ".p404",
  DOWNLOAD_LINK: "#download_link",
} as const;

const getDetailsUrl = (appId: string) => {
  return `https://apkpure.com/fr/${appId}`;
};

const getDownloadUrl = async (appId: string) => {
  const html = await (await fetch(`${getDetailsUrl(appId)}/download`)).text();
  const $ = cheerio.load(html);

  return ($(SELECTORS.DOWNLOAD_LINK).attr("href") as string).trim();
};

export interface Details {
  title: string;
  version: string;
  type: "XAPK" | "APK";
  downloadLink: string;
}

export default async (appId: string): Promise<Details> => {
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

  const type = $(SELECTORS.DOWNLOAD_BTN)
    .text()
    .includes("XAPK")
    ? "XAPK"
    : "APK";

  return {
    title,
    version,
    type,
    downloadLink: await getDownloadUrl(appId),
  };
};
