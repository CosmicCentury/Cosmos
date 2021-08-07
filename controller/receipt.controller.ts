export {};
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../lib/classes/ApiError");

const getReceipt = (req: any, res: any) => {
  //   console.log(getRoute());
  return { statusCodes: 200, data: "HI" };
};

module.exports = { getReceipt };
