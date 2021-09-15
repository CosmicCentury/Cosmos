import puppeteer from "puppeteer";

class Browser {
  private launchOptions = {
    headless: true,
    args: ["--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
  };
  constructor() {}

  async startBrowser() {
    let browser;
    try {
      browser = await puppeteer.launch(this.launchOptions);
    } catch (err) {
      console.error(err);
    } finally {
      return browser;
    }
  }
}

export default Browser;
