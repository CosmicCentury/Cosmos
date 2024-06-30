import puppeteer, { Browser, PuppeteerLaunchOptions } from "puppeteer";

interface BrowserDriverImpl {
  launch(options: PuppeteerLaunchOptions): Promise<Browser>;
  close(): Promise<void>;
}

class BrowserDriver implements BrowserDriverImpl {
  #browser: Browser | undefined;
  constructor() {}

  launch = async (options?: PuppeteerLaunchOptions): Promise<Browser> => {
    this.#browser = await puppeteer.launch({ headless: true, ...options });
    return this.#browser;
  };

  close = async (): Promise<void> => {
    if (this.#browser?.connected) {
      await this.#browser.close();
    }
  };
}

export default BrowserDriver;
