import { Page } from "puppeteer";

class Scrapper {
  #page: Page;
  constructor(page: Page) {
    this.#page = page;
  }

  extractTableText = async (
    selectorsTableId: string,
    secondarySelectors: "thead" | "tbody"
  ): Promise<(string | undefined)[][] | undefined> => {
    const result = await this.#page.evaluate(
      (tableId, secSelectors) => {
        document.querySelector(tableId);
        const t = document.querySelector(secSelectors);

        if (t) {
          return Array.from(t.querySelectorAll("tr")).map((tr) =>
            Array.from(
              tr.querySelectorAll(secSelectors === "thead" ? "th" : "td")
            ).map((tdh) => tdh.textContent?.trim())
          );
        }
      },
      selectorsTableId,
      secondarySelectors
    );
    return result;
  };
}

export default Scrapper;
