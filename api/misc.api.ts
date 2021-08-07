import { StatusCodes } from "http-status-codes";
import BaseResponse from "../lib/classes/BaseResponse";
import { ApiDictionary } from "../lib/ts/api.interface";
import { routes } from "../router";

const api: ApiDictionary = {
  GET: [
    {
      name: "route",
      description: "get all API routes",
      version: "1",
      permissions: [],
      controller: () => new BaseResponse(StatusCodes.OK, routes.getObj()),
    },
    {
      name: "get",
      description: "get all GET routes",
      version: "1",
      permissions: [],
      rootPath: "route",
      controller: () =>
        new BaseResponse(StatusCodes.OK, routes.retrieveGetRoutes()),
    },
    {
      name: "post",
      description: "get all POST routes",
      version: "1",
      permissions: [],
      rootPath: "route",
      controller: () =>
        new BaseResponse(StatusCodes.OK, routes.retrievePostRoutes()),
    },
    {
      name: "put",
      description: "get all PUT routes",
      version: "1",
      permissions: [],
      rootPath: "route",
      controller: () =>
        new BaseResponse(StatusCodes.OK, routes.retrievePutRoutes()),
    },
    {
      name: "patch",
      description: "get all PATCH routes",
      version: "1",
      permissions: [],
      rootPath: "route",
      controller: () =>
        new BaseResponse(StatusCodes.OK, routes.retrievePatchRoutes()),
    },
    {
      name: "delete",
      description: "get all DELETE routes",
      version: "1",
      permissions: [],
      rootPath: "route",
      controller: () =>
        new BaseResponse(StatusCodes.OK, routes.retrieveDeleteRoutes()),
    },
  ],
  POST: [],
  PUT: [],
  PATCH: [],
  DELETE: [],
};

export = api;
