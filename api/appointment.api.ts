import { StatusCodes } from "http-status-codes";
import BaseResponse from "../lib/classes/BaseResponse";
import { ApiDictionary } from "../lib/ts/api.interface";
import * as controller from "../controller";

const api: ApiDictionary = {
  GET: [
    {
      name: "appointments",
      description: "get current view appointment",
      version: "1",
      permissions: [],
      controller: controller.getAppointments,
    },
  ],
  POST: [],
  PUT: [],
  PATCH: [],
  DELETE: [],
};

export = api;
