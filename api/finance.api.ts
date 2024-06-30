import { StatusCodes } from "http-status-codes";
import * as controller from "../controller";
import BaseResponse from "../lib/classes/BaseResponse";
import { ApiDictionary } from "../lib/ts/api.interface";
import { routes } from "../router";

const api: ApiDictionary = {
  GET: [
    {
      name: "tracker",
      description: "get stock tracker",
      version: 1,
      roles: [],
      controller: () =>
        new BaseResponse(StatusCodes.NOT_IMPLEMENTED, "Not Implemented"),
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
  ],
  POST: [],
  PUT: [],
  PATCH: [],
  DELETE: [],
};

export = api;
