"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const controller = __importStar(require("../controller"));
const api = {
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
module.exports = api;
//# sourceMappingURL=users.api.js.map