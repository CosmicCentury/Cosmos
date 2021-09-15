import ApiError from "../lib/classes/ApiError";
import chalk from "chalk";
import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    console.log(chalk.red(err.message));
    res.status(err.statusCode).send(err.message);
  }
};

export default errorHandler;
