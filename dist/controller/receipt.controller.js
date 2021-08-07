"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../lib/classes/ApiError");
const getReceipt = (req, res) => {
    //   console.log(getRoute());
    return { statusCodes: 200, data: "HI" };
};
module.exports = { getReceipt };
//# sourceMappingURL=receipt.controller.js.map