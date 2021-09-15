import puppeteer from "puppeteer";

class Utils {
  private launchOptions = {
    headless: false,
    args: ["--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
  };
  constructor() {}

  async startBrowser() {
    try {
      const browser = await puppeteer.launch(this.launchOptions);

      return browser;
    } catch (err) {
      console.error(err);
    }
  }
}

export default Utils;
