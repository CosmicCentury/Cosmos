"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const http_status_codes_1 = require("http-status-codes");
const BaseResponse_1 = __importDefault(require("../lib/classes/BaseResponse"));
const router_1 = require("../router");
const api = {
    GET: [
        {
            name: "route",
            description: "get all API routes",
            version: "1",
            permissions: [],
            controller: () => new BaseResponse_1.default(http_status_codes_1.StatusCodes.OK, router_1.routes.getObj()),
        },
        {
            name: "get",
            description: "get all GET routes",
            version: "1",
            permissions: [],
            rootPath: "route",
            controller: () => new BaseResponse_1.default(http_status_codes_1.StatusCodes.OK, router_1.routes.retrieveGetRoutes()),
        },
        {
            name: "post",
            description: "get all POST routes",
            version: "1",
            permissions: [],
            rootPath: "route",
            controller: () => new BaseResponse_1.default(http_status_codes_1.StatusCodes.OK, router_1.routes.retrievePostRoutes()),
        },
        {
            name: "put",
            description: "get all PUT routes",
            version: "1",
            permissions: [],
            rootPath: "route",
            controller: () => new BaseResponse_1.default(http_status_codes_1.StatusCodes.OK, router_1.routes.retrievePutRoutes()),
        },
        {
            name: "patch",
            description: "get all PATCH routes",
            version: "1",
            permissions: [],
            rootPath: "route",
            controller: () => new BaseResponse_1.default(http_status_codes_1.StatusCodes.OK, router_1.routes.retrievePatchRoutes()),
        },
        {
            name: "delete",
            description: "get all DELETE routes",
            version: "1",
            permissions: [],
            rootPath: "route",
            controller: () => new BaseResponse_1.default(http_status_codes_1.StatusCodes.OK, router_1.routes.retrieveDeleteRoutes()),
        },
    ],
    POST: [],
    PUT: [],
    PATCH: [],
    DELETE: [],
};
module.exports = api;
//# sourceMappingURL=misc.api.js.map