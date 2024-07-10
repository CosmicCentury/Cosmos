import { StatusCodes } from "http-status-codes";
import * as controller from "../controller";
import BaseResponse from "../lib/classes/BaseResponse";
import { ApiDictionary } from "../lib/ts/api.interface";
import { routes } from "../router";

const api: ApiDictionary = {
  GET: [
    {
      name: "politicians",
      description: "get top 10 politicians",
      version: 1,
      controller: controller.getTopPoliticians,
    },
    {
      name: "tracker",
      description: "get stock tracker",
      version: 1,
      roles: [],
    },
    {
      name: "politician",
      description: "politicians tracking",
      rootPath: "tracker",
      controller: controller.tracker,
      roles: [],
      version: 1,
      param: "name",
    },
    {
      name: "holdings",
      description: "get top holdings of index fund/etf",
      version: 1,
      controller: controller.getHoldings,
      param: "stock",
    },
  ],
  POST: [],
  PUT: [],
  PATCH: [],
  DELETE: [],
};

export = api;
