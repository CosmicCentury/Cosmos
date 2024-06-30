import { StatusCodes } from "http-status-codes";
import * as controller from "../controller";
import BaseResponse from "../lib/classes/BaseResponse";
import { ApiDictionary } from "../lib/ts/api.interface";
import { routes } from "../router";

const api: ApiDictionary = {
  GET: [
    {
      name: "file",
      description: "download file",
      version: 1,
      roles: [],
      controller: controller.downloadFile,
    },
    {
      name: "website",
      description: "scrape website (custom)",
      version: 1,
      roles: [],
      rootPath: "file",
      controller: controller.scrapeWebsiteVideo,
    },
  ],
  POST: [],
  PUT: [],
  PATCH: [],
  DELETE: [],
};

export = api;
