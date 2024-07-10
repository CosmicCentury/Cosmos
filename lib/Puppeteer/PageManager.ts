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

  findM3U8Url = async (url: string) => {
    const urlLink = await this.intercept(url);
    console.log(urlLink);
    return urlLink;
  };
}

export default PageManager;
