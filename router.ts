import fs from "fs";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import ApiError from "./lib/classes/ApiError";
import AuthenticatedResponse from "./lib/classes/AuthenticatedResponse";
import BaseResponse from "./lib/classes/BaseResponse";
import Routes from "./lib/classes/Routes";
import jwt from "jsonwebtoken";
import MediaResponse from "./lib/classes/MediaResponse";
import { Request, Response, NextFunction, IRouter } from "express";
import path from "path";
import {
  ApiDictionary,
  ApiParams,
  TData,
  TRequest,
} from "./lib/ts/api.interface";
import User from "./model/user";
import UserRole from "./model/userRole";
import Roles from "./model/roles";

const baseApi = "/api";

const routes = new Routes();

let operations = {
  GET: {},
  POST: {},
  PUT: {},
  PATCH: {},
  DELETE: {},
};

/**
 *
 * @param router
 * @returns
 */
const preprocessRoutes = (router: IRouter) => {
  // get api directory

  const apiDir = fs.readdirSync(`${__dirname}/api`);

  for (let dir of apiDir) {
    const readFile = require(`./api/${dir}`);

    const getRoutes = buildApiRoutes(readFile.GET);
    operations.GET = { ...operations.GET, ...getRoutes };

    const postRotues = buildApiRoutes(readFile.POST);
    operations.POST = { ...operations.POST, ...postRotues };

    const putRotues = buildApiRoutes(readFile.PUT);
    operations.PUT = { ...operations.PUT, ...putRotues };

    const patchRotues = buildApiRoutes(readFile.PATCH);
    operations.PATCH = { ...operations.PATCH, ...patchRotues };

    const deleteRotues = buildApiRoutes(readFile.DELETE);
    operations.DELETE = { ...operations.DELETE, ...deleteRotues };
  }
  // console.log(operations);

  processRoute(router, operations.GET, "GET");
  processRoute(router, operations.POST, "POST");
  processRoute(router, operations.PUT, "PUT");
  processRoute(router, operations.PATCH, "PATCH");
  processRoute(router, operations.DELETE, "DELETE");

  router.use("*", () => {
    throw new ApiError(StatusCodes.NOT_FOUND, "Route does not exist");
  });
  routes.setObj(operations);

  return router;
};

const buildApiRoutes = (apiArr: ApiParams[]) => {
  let operations: any = {};

  // build api with versions first
  for (let v of apiArr) {
    const apiName = searchApiName(v, apiArr);

    operations[apiName] = {
      description: v.description,
      roles: v.roles,
      required_auth: v.required_auth,
      controller: v.controller,
    };
  }

  return operations;
};

const searchApiName = (v: ApiParams, arr: ApiParams[]): any => {
  if (arr.length < 1) {
    return v;
  }
  if (v.version && !v.rootPath) {
    return v.param
      ? `v${v.version}/${v.name}/:${v.param}`
      : `v${v.version}/${v.name}`;
  }

  if (v.rootPath) {
    let nV = searchNewPath(v.rootPath, v.version, arr);
    if (nV.length < 1) {
      throw new Error("Api version mismatched");
    }

    return v.param
      ? searchApiName(nV[0], arr) + `/${v.name}/:${v.param}`
      : searchApiName(nV[0], arr) + `/${v.name}`;
  }
};
const searchNewPath = (path: string, version: number, arr: ApiParams[]) => {
  return arr.filter(
    (item: any) => item.name === path && item.version === version
  );
};

const processRoute = async (
  router: any,
  operations: ApiDictionary,
  key: string
) => {
  const lookup: any = {
    GET: () => {
      for (let i in operations) {
        router.get(
          `${baseApi}/${i}`,
          async (req: TRequest, res: Response, next: NextFunction) =>
            await prepocessResponse(req, res, next, operations[i])
        );
      }
    },
    POST: () => {
      for (let i in operations) {
        router.post(
          `${baseApi}/${i}`,
          async (req: TRequest, res: Response, next: NextFunction) =>
            await prepocessResponse(req, res, next, operations[i])
        );
      }
    },
    PUT: () => {
      for (let i in operations) {
        router.put(
          `${baseApi}/${i}`,
          async (req: TRequest, res: Response, next: NextFunction) =>
            await prepocessResponse(req, res, next, operations[i])
        );
      }
    },
    PATCH: () => {
      for (let i in operations) {
        router.patch(
          `${baseApi}/${i}`,
          async (req: TRequest, res: Response, next: NextFunction) =>
            await prepocessResponse(req, res, next, operations[i])
        );
      }
    },
    DELETE: () => {
      for (let i in operations) {
        router.delete(
          `${baseApi}/${i}`,
          async (req: TRequest, res: Response, next: NextFunction) =>
            await prepocessResponse(req, res, next, operations[i])
        );
      }
    },
  };
  lookup[key]();
};

const prepocessResponse = async (
  req: TRequest,
  res: Response,
  next: NextFunction,
  operation: ApiParams
) => {
  try {
    if (operation.required_auth) {
      const result = jwt.verify(req.cookies.token, process.env.JWT_SECRET!);
      console.log(result);
      req.userID = result["id"];
    }

    if (operation.roles && operation.roles.length > 0) {
      if (!req.userID) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "User not authenticated");
      }
      const _user = await User.findOne({
        where: { id: req.userID },
        include: [
          {
            model: UserRole,
            required: true,
            subQuery: false,
            include: [
              {
                model: Roles,
                required: true,
                subQuery: false,
              },
            ],
          },
        ],
      });

      const _userRole = _user?.getDataValue("user_role");
      const _role = _userRole?.getDataValue("role");
      console.log(_userRole);
      console.log(_role);
      const isCorrectRole = operation.roles.some((x) => x === _role.name);
      console.log(isCorrectRole);
      if (!isCorrectRole) {
        throw new ApiError(
          StatusCodes.UNAUTHORIZED,
          "No permission to execute this api"
        );
      }
    }
    await response(await operation.controller(req, res, next), res);
  } catch (err: any) {
    next(err);
  }
};

const response = async (data: TData, res: Response) => {
  if (data?.constructor?.name === BaseResponse.name) {
    res.status(data.statusCode).send(data.data);
  }
  if (data?.constructor?.name === AuthenticatedResponse.name) {
    res.status(data.statusCode).send(data.token);
  }
  if (data?.constructor?.name === MediaResponse.name) {
    res.download(data.data);
  }
};

export { preprocessRoutes, routes };
