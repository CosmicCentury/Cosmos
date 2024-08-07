import { StatusCodes } from "http-status-codes";
import BaseResponse from "../lib/classes/BaseResponse";
import { ExpressHandler } from "../lib/ts/api.interface";
import BrowserDriver from "../lib/Puppeteer/BrowserDriver";
import BrowserManager from "../lib/Puppeteer/BrowserManager";
import PageManager from "../lib/Puppeteer/PageManager";
import ApiError from "../lib/classes/ApiError";
import { Request } from "express";

interface TrackerInterface extends Request {
  params: {
    name: string;
  };
}

const tracker: ExpressHandler<TrackerInterface> = async (req, res, next) => {
  const politicianName = req.params.name;
  const browserDriver = new BrowserDriver();
  const browserManager = new BrowserManager(browserDriver);

  try {
    await browserManager.openBrowser();
    const page = await browserManager.createPage({ width: 1080, height: 1024 });
    const pageManager = new PageManager(page);
    await pageManager.navigate(
      new URL(
        `https://www.quiverquant.com/congresstrading/politician/${politicianName}`
      ),
      { waitUntil: "networkidle0", timeout: 0 }
    );

    const tableHead = await pageManager.extractTableText(
      "#tradeTable",
      "thead",
      true,
      "textContent"
    );

    const tableBody = await pageManager.extractTableText(
      "#tradeTable",
      "tbody",
      true,
      "innerText"
    );

    const responseBody = {
      head: tableHead?.flat(),
      body: tableBody,
    };
    return new BaseResponse(StatusCodes.OK, responseBody);
  } catch (err) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      (err as Error).message
    );
  } finally {
    await browserManager.closeBrowser();
  }
};

const getTopPoliticians: ExpressHandler = async (req, res, next) => {
  const politicianNames = [
    "Brian Higgins",
    "Mark Green",
    "Garret Graves",
    "David Rouzer",
    "Seth Moulton",
    "Nancy Pelosi",
    "Ron Wyden",
    "John Rutherford",
    "Richard Blumenthal",
    "Pete Sessions",
  ];
  return new BaseResponse(StatusCodes.OK, politicianNames);
};

const getHoldings: ExpressHandler<
  { params: { stock: string } } & Request
> = async (req) => {};

export { tracker, getTopPoliticians, getHoldings };
