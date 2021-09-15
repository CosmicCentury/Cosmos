import Browser from "./browser";
import cheerio from "cheerio";

class Scrapper extends Browser {
  url: any;
  constructor(url) {
    super();
    this.url = url;
  }

  async scrapePage() {
    const browserInstance = await this.startBrowser();
    const page = await browserInstance.newPage();

    await page.goto(this.url);

    const content = await page.content();

    const $ = cheerio.load(content);

    const videoSrc = $("video").children("source")[0]["attribs"].src;

    return videoSrc;
  }
}

export default Scrapper;
