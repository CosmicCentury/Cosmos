import { GoToOptions, Page } from "puppeteer";
import Scrapper from "./Scrapper";
import got from "got";

class PageManager extends Scrapper {
  #page: Page;

  constructor(page: Page) {
    super(page);
    this.#page = page;
  }

  navigate = async (url: URL, options?: GoToOptions): Promise<void> => {
    const res = await got(url);
    await this.#page.goto(res.url, options);
  };
}

export default PageManager;
