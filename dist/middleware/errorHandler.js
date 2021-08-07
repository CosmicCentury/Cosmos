"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../lib/classes/ApiError"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError_1.default) {
        res.status(err.statusCode).send(err.message);
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map