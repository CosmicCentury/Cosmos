import { Page } from "puppeteer";
import Utils from "./Utils";

class Scrapper extends Utils {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  extractTableText = async (
    selectorsTableId: string,
    secondarySelectors: "thead" | "tbody",
    trim: boolean = false,
    contentType: "innerText" | "textContent" = "textContent"
  ): Promise<(string | null | undefined)[][] | undefined> => {
    const result = await this.page.evaluate(
      (tableId, secSelectors, trim, contentType) => {
        document.querySelector(tableId);
        const t = document.querySelector(secSelectors);

        if (t) {
          return Array.from(t.querySelectorAll("tr")).map((tr) =>
            Array.from(
              tr.querySelectorAll(secSelectors === "thead" ? "th" : "td")
            ).map((cell) =>
              trim ? cell[contentType]?.trim() : cell[contentType]
            )
          );
        }
      },
      selectorsTableId,
      secondarySelectors,
      trim,
      contentType
    );
    return result;
  };

  intercept = async (url: string) => {
    return new Promise(async (resolve, reject) => {
      this.page.on("request", (request) => {
        const requestUrl = new URL(request.url());
        if (`${requestUrl.origin}${requestUrl.pathname}`.endsWith(".m3u8")) {
          try {
            console.log("Found M3U8 URL:", requestUrl.href);
            this.page.off("request");
            resolve(requestUrl.href);
          } catch (error) {
            console.error("Error parsing URL:", error);
            reject(error);
          }
        }
      });
      await this.page.goto(url, { waitUntil: "networkidle2" });
    });
  };
}

export default Scrapper;
