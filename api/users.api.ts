import { StatusCodes } from "http-status-codes";
import * as controller from "../controller";
import BaseResponse from "../lib/classes/BaseResponse";
import { ApiDictionary } from "../lib/ts/api.interface";

const api: ApiDictionary = {
  GET: [
    {
      name: "user",
      description: "get user information",
      version: "1",
      required_auth: true,
      permissions: [],
      controller: controller.getUser,
    },
    {
      name: "all",
      rootPath: "user",
      description: "get all user information",
      version: "1",
      required_auth: true,
      permissions: [],
      controller: controller.getAllUsers,
    },
  ],
  POST: [
    {
      name: "user",
      description: "retrieve a user",
      version: "1",
      permissions: [],
      controller: () =>
        new BaseResponse(StatusCodes.NOT_IMPLEMENTED, "Nothing"),
    },
    {
      name: "authenticate",
      rootPath: "user",
      description: "auth user for logging in",
      version: "1",
      permissions: [],
      controller: controller.authenticate,
    },
    {
      name: "register",
      rootPath: "user",
      description: "register new user",
      version: "1",
      controller: controller.register,
    },
  ],
  PUT: [
    {
      name: "user",
      description: "update a user",
      version: "1",
      required_auth: true,
      permissions: [],
      controller: controller.updateUser,
    },
  ],
  PATCH: [],
  DELETE: [],
};

export = api;
