import scrape, { Details } from "../src";

jest.setTimeout(30000);

const testDetails = ({ downloadLink, title, version, type }: Details) => {
  expect(downloadLink.length).toBeGreaterThan(0);
  expect(downloadLink).toContain("download.apkpure.com");
  expect(downloadLink).toContain(type === "APK" ? "/APK/" : "/XAPK/");
  expect(title.length).toBeGreaterThan(0);
  expect(version.length).toBeGreaterThan(0);
};

describe("scraper", () => {
  it("works with APK", async () => {
    const details = await scrape("com.instagram.android");

    expect(details.type).toEqual("APK");
    testDetails(details);
  });

  it("works with XAPK", async () => {
    const details = await scrape("com.dts.freefireth");

    expect(details.type).toEqual("XAPK");
    testDetails(details);
  });

  it("throw if appId not correct", async () => {
    try {
      await scrape("non existant");
      expect(false).toBe(true);
    } catch (ex) {
      expect(ex).toEqual(new Error("App with this appId not found"));
    }
  });
});
