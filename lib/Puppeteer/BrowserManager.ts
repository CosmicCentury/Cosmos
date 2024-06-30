import puppeteer, { Browser, GoToOptions } from "puppeteer";
import BrowserDriver from "./BrowserDriver";

type viewport = {
  width: number;
  height: number;
};

class BrowserManager {
  #browserDriver: BrowserDriver;
  #browser: Browser | undefined;

  constructor(browserDriver: BrowserDriver) {
    this.#browserDriver = browserDriver;
  }

  openBrowser = async () => {
    this.#browser = await this.#browserDriver.launch();
  };

  createPage = async (viewport?: viewport) => {
    if (!this.#browser?.connected) {
      throw new Error("Browser not initialized. Call openBrowser first.");
    }
    const page = await this.#browser.newPage();

    if (viewport) {
      page.setViewport(viewport);
    }
    return page;
  };

  closeBrowser = async () => {
    await this.#browserDriver.close();
  };
}

export default BrowserManager;
