import { StatusCodes } from "http-status-codes";
import * as controller from "../controller";
import BaseResponse from "../lib/classes/BaseResponse";
import { ApiDictionary } from "../lib/ts/api.interface";

const api: ApiDictionary = {
  GET: [
    {
      name: "latest",
      description: "get user information",
      version: "1",
      required_auth: true,
      permissions: [],
      controller: controller.latest,
    },
  ],
  POST: [],
  PUT: [],
  PATCH: [],
  DELETE: [],
};

export = api;
