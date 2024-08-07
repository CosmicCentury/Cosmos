import { StatusCodes } from "http-status-codes";
import * as controller from "../controller";
import BaseResponse from "../lib/classes/BaseResponse";
import { ApiDictionary } from "../lib/ts/api.interface";
import { routes } from "../router";

const api: ApiDictionary = {
  GET: [
    {
      name: "video",
      description: "media",
      version: 1,
      roles: [],
    },
    {
      name: "download",
      description: "scrape website (custom)",
      version: 1,
      roles: [],
      rootPath: "video",
      controller: controller.downloadM3U8,
    },
  ],
  POST: [],
  PUT: [],
  PATCH: [],
  DELETE: [],
};

export = api;
