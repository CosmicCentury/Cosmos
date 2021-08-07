export {};
import fs from "fs";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import ApiError from "./lib/classes/ApiError";
import BaseResponse from "./lib/classes/BaseResponse";
import Routes from "./lib/classes/Routes";

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
const preprocessRoutes = (router: any) => {
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

const buildApiRoutes = (apiArr: any) => {
  let operations: any = {};

  // build api with versions first
  for (let v of apiArr) {
    const apiName = searchApiName(v, apiArr);

    operations[apiName] = {
      description: v.description,
      permissions: v.permissions,
      controller: v.controller,
    };
  }

  return operations;
};

const searchApiName = (v: any, arr: any): any => {
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
const searchNewPath = (path: string, version: any, arr: any) => {
  return arr.filter(
    (item: any) => item.name === path && item.version === version
  );
};

const processRoute = async (router: any, operations: any, key: string) => {
  const lookup: any = {
    GET: () => {
      for (let i in operations) {
        router.get(`${baseApi}/${i}`, async (req: any, res: any, next: any) =>
          response(await operations[i].controller(req, res, next), res)
        );
      }
    },
    POST: () => {
      for (let i in operations) {
        router.post(`${baseApi}/${i}`, async (req: any, res: any, next: any) =>
          response(await operations[i].controller(req, res, next), res)
        );
      }
    },
    PUT: () => {
      for (let i in operations) {
        router.put(`${baseApi}/${i}`, async (req: any, res: any) =>
          response(await operations[i].controller(req, res), res)
        );
      }
    },
    PATCH: () => {
      for (let i in operations) {
        router.patch(`${baseApi}/${i}`, async (req: any, res: any) =>
          response(await operations[i].controller(req, res), res)
        );
      }
    },
    DELETE: () => {
      for (let i in operations) {
        router.delete(`${baseApi}/${i}`, async (req: any, res: any) =>
          response(await operations[i].controller(req, res), res)
        );
      }
    },
  };
  lookup[key]();
};

const response = async (data: any, res: any) => {
  if (data?.constructor?.name === BaseResponse.name) {
    res.status(data.statusCode).send(data.data);
  }
};

export { preprocessRoutes, routes };
