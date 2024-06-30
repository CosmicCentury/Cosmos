import { Page } from "puppeteer";

class Scrapper {
  #page: Page;
  constructor(page: Page) {
    this.#page = page;
  }

  extractTableText = async (
    selectorsTableId: string,
    secondarySelectors: "thead" | "tbody",
    trim: boolean = false,
    contentType: "innerText" | "textContent" = "textContent"
  ): Promise<(string | null | undefined)[][] | undefined> => {
    const result = await this.#page.evaluate(
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
}

export default Scrapper;
