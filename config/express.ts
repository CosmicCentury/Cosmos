export {};
import express from "express";
const { Router } = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

import * as MainRouter from "../router";
import ErrorMiddleware from "../middleware/errorHandler";

const app = express();
const router = Router();

/**
 * @function init
 * @return {any} app
 */
const init = () => {
  app.use(cors());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(MainRouter.preprocessRoutes(router));

  app.use(ErrorMiddleware);
  return app;
};

export { init };
