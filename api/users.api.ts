import { StatusCodes } from "http-status-codes";
import * as controller from "../controller";
import BaseResponse from "../lib/classes/BaseResponse";
import { ROLES } from "../lib/constants/roles.constants";
import { ApiDictionary } from "../lib/ts/api.interface";

const api: ApiDictionary = {
  GET: [
    {
      name: "user",
      description: "get user information",
      version: 1,
      required_auth: true,
      roles: [],
      controller: controller.getUser,
    },
    {
      name: "users",
      description: "get all users information",
      version: 1,
      required_auth: true,
      roles: [ROLES.SUPERADMIN, ROLES.ADMIN],
      controller: controller.getAllUsers,
    },
    {
      name: "roles",
      description: "get all roles",
      version: 1,
      required_auth: true,
      roles: [ROLES.SUPERADMIN, ROLES.ADMIN],
      controller: controller.getroles,
    },
  ],
  POST: [
    {
      name: "user",
      description: "retrieve a user",
      version: 1,
    },
    {
      name: "authenticate",
      rootPath: "user",
      description: "auth user for logging in",
      version: 1,
      controller: controller.authenticate,
    },
    {
      name: "register",
      rootPath: "user",
      description: "register new user",
      version: 1,
      controller: controller.register,
    },
  ],
  PUT: [
    {
      name: "user",
      description: "update a user",
      version: 1,
      required_auth: true,
      roles: [],
      controller: controller.updateUser,
    },
    {
      name: "password",
      description: "update password",
      version: 1,
      required_auth: true,
      rootPath: "user",
      roles: [ROLES.SUPERADMIN, ROLES.ADMIN],
      controller: controller.changePassword,
    },
    {
      name: "reset",
      description: "reset password",
      version: 1,
      required_auth: true,
      rootPath: "password",
      roles: [ROLES.SUPERADMIN, ROLES.ADMIN],
      controller: controller.resetPassword,
    },
    {
      name: "role",
      description: "update role",
      version: 1,
      required_auth: true,
      rootPath: "user",
      roles: [ROLES.SUPERADMIN, ROLES.ADMIN],
      controller: controller.updateUserRole,
    },
  ],
  PATCH: [],
  DELETE: [],
};

export = api;
