import { StatusCodes } from "http-status-codes";
import * as controller from "../controller";
import BaseResponse from "../lib/classes/BaseResponse";
import { ApiDictionary } from "../lib/ts/api.interface";
import { routes } from "../router";

const api: ApiDictionary = {
  GET: [
    {
      name: "sse",
      description: "Server Sent Events base API",
      version: 1,
      roles: [],
    },
    {
      name: "test",
      description: "notion pages",
      version: 1,
      rootPath: "sse",
      options: {
        sse: true,
      },
      roles: [],
      controller: controller.testApi,
    },
    {
      name: "test2",
      description: "notion pages",
      version: 1,
      rootPath: "test",
      roles: [],
    },
  ],
  POST: [],
  PUT: [],
  PATCH: [],
  DELETE: [],
};

export = api;
