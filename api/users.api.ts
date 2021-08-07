import * as controller from "../controller";
import { ApiDictionary } from "../lib/ts/api.interface";

const api: ApiDictionary = {
  GET: [
    {
      name: "updateLoginTime",
      description: "",
      version: "1",
      permissions: [],
      param: "id",
      controller: controller.updateLoginTime,
    },
    {
      name: "users",
      description: "get all user information",
      version: "1",
      permissions: [],
      controller: controller.getAllUsers,
    },
  ],
  POST: [
    {
      name: "user",
      description: "create new user",
      version: "1",
      permissions: [],
      controller: controller.createNewUser,
    },
    {
      name: "authenticate",
      rootPath: "user",
      description: "auth user for logging in",
      version: "1",
      permissions: [],
      controller: controller.authenticate,
    },
  ],
  PUT: [],
  PATCH: [],
  DELETE: [],
};

export = api;
