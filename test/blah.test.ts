import scrape from "../src";

jest.setTimeout(30000);

describe("parser", () => {
  it("works", async () => {
    const { downloadLink, title, version } = await scrape(
      "com.instagram.android"
    );
    expect(downloadLink.length).toBeGreaterThan(0);
    expect(title.length).toBeGreaterThan(0);
    expect(version.length).toBeGreaterThan(0);
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
