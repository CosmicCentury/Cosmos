"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = exports.preprocessRoutes = void 0;
const fs_1 = __importDefault(require("fs"));
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("./lib/classes/ApiError"));
const BaseResponse_1 = __importDefault(require("./lib/classes/BaseResponse"));
const Routes_1 = __importDefault(require("./lib/classes/Routes"));
const baseApi = "/api";
const routes = new Routes_1.default();
exports.routes = routes;
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
const preprocessRoutes = (router) => {
    // get api directory
    const apiDir = fs_1.default.readdirSync(`${__dirname}/api`);
    for (let dir of apiDir) {
        const readFile = require(`./api/${dir}`);
        const getRoutes = buildApiRoutes(readFile.GET);
        operations.GET = Object.assign(Object.assign({}, operations.GET), getRoutes);
        const postRotues = buildApiRoutes(readFile.POST);
        operations.POST = Object.assign(Object.assign({}, operations.POST), postRotues);
        const putRotues = buildApiRoutes(readFile.PUT);
        operations.PUT = Object.assign(Object.assign({}, operations.PUT), putRotues);
        const patchRotues = buildApiRoutes(readFile.PATCH);
        operations.PATCH = Object.assign(Object.assign({}, operations.PATCH), patchRotues);
        const deleteRotues = buildApiRoutes(readFile.DELETE);
        operations.DELETE = Object.assign(Object.assign({}, operations.DELETE), deleteRotues);
    }
    // console.log(operations);
    processRoute(router, operations.GET, "GET");
    processRoute(router, operations.POST, "POST");
    processRoute(router, operations.PUT, "PUT");
    processRoute(router, operations.PATCH, "PATCH");
    processRoute(router, operations.DELETE, "DELETE");
    router.use("*", () => {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Route does not exist");
    });
    routes.setObj(operations);
    return router;
};
exports.preprocessRoutes = preprocessRoutes;
const buildApiRoutes = (apiArr) => {
    let operations = {};
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
const searchApiName = (v, arr) => {
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
const searchNewPath = (path, version, arr) => {
    return arr.filter((item) => item.name === path && item.version === version);
};
const processRoute = (router, operations, key) => __awaiter(void 0, void 0, void 0, function* () {
    const lookup = {
        GET: () => {
            for (let i in operations) {
                router.get(`${baseApi}/${i}`, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { return response(yield operations[i].controller(req, res, next), res); }));
            }
        },
        POST: () => {
            for (let i in operations) {
                router.post(`${baseApi}/${i}`, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { return response(yield operations[i].controller(req, res, next), res); }));
            }
        },
        PUT: () => {
            for (let i in operations) {
                router.put(`${baseApi}/${i}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return response(yield operations[i].controller(req, res), res); }));
            }
        },
        PATCH: () => {
            for (let i in operations) {
                router.patch(`${baseApi}/${i}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return response(yield operations[i].controller(req, res), res); }));
            }
        },
        DELETE: () => {
            for (let i in operations) {
                router.delete(`${baseApi}/${i}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return response(yield operations[i].controller(req, res), res); }));
            }
        },
    };
    lookup[key]();
});
const response = (data, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (((_a = data === null || data === void 0 ? void 0 : data.constructor) === null || _a === void 0 ? void 0 : _a.name) === BaseResponse_1.default.name) {
        res.status(data.statusCode).send(data.data);
    }
});
//# sourceMappingURL=router.js.map