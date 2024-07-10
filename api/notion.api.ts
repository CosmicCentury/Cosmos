import { StatusCodes } from "http-status-codes";
import * as controller from "../controller";
import BaseResponse from "../lib/classes/BaseResponse";
import { ApiDictionary } from "../lib/ts/api.interface";
import { routes } from "../router";

const api: ApiDictionary = {
  GET: [
    {
      name: "notion",
      description: "notion base",
      version: 1,
      roles: [],
    },
    {
      name: "pages",
      description: "notion pages",
      version: 1,
      rootPath: "notion",
      roles: [],
      controller: controller.getAllPages,
    },
  ],
  POST: [],
  PUT: [],
  PATCH: [],
  DELETE: [],
};

export = api;
