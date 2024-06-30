export {};
import express from "express";
const { Router } = require("express");
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import * as MainRouter from "../router";
import ErrorMiddleware from "../middleware/errorHandler";

const app = express();
const router = Router();

/**
 * @function init
 * @return {any} app
 */
const init = async () => {
  app.use(
    cors({
      origin: "*",
    })
  );

  app.disable("x-powered-by");
  app.enable("trust proxy");

  app.use(cookieParser());
  app.use(helmet());
  app.use(morgan("combined"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, x-access-token, X-Requested-With, Content-Type, Accept"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)

    //@ts-expect-error
    res.setHeader("Access-Control-Allow-Credentials", true);

    next();
  });

  await app.use(MainRouter.preprocessRoutes(router));

  app.use(ErrorMiddleware);
  return app;
};

export { init };
