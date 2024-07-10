import puppeteer, {
  Browser,
  GoToOptions,
  PuppeteerLaunchOptions,
} from "puppeteer";
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

  openBrowser = async (options?: PuppeteerLaunchOptions) => {
    this.#browser = await this.#browserDriver.launch(options);
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

  getPages = async () => {
    if (!this.#browser?.connected) {
      throw new Error("Browser not initialized. Call openBrowser first.");
    }
    return await this.#browser.pages();
  };
}

export default BrowserManager;
