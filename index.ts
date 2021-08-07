import "dotenv/config";
import { init } from "./config/express";

const app = init();

require("./config/dbManager").init();

app.listen(process.env.PORT, () => {
  console.info(
    `App is listening at http//${process.env.HOST}:${process.env.PORT}`
  );
});

process
  .on("unhandledRejection", (reason, promise) => {
    const errInfo = `${new Date().toUTCString()} ${reason} unhandledRejection: ${promise}`;
    console.error(
      new Date().toUTCString() + " " + reason,
      " unhandledRejection:",
      promise
    );
  })
  .on("uncaughtException", (err) => {
    const errInfo = `${new Date().toUTCString()} uncaughtException: ${
      err.message
    }`;
    const errStack = err.stack;
    console.error(
      new Date().toUTCString() + " uncaughtException:",
      err.message
    );
    console.error(err.stack);

    process.exit(1);
  });
