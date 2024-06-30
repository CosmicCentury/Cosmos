import dotenv from "dotenv";
dotenv.config();

import { init as appInit } from "./config/express";
// import { init as dbInit } from "./config/dbManager";
// import JoinSavings from "./model/jointSavings";
// import Tbills from "./model/tbills";
// import User from "./model/user";
// import UserRole from "./model/userRole";
// import Roles from "./model/roles";
// import seedDatabase from "./seed";

// dbInit().then(async () => {
//   await User.sync();
//   await UserRole.sync();
//   await Roles.sync();
//   await JoinSavings.sync();
//   await Tbills.sync();
//   if (process.env.NODE_ENV === "development") {
//     await seedDatabase();
//   }
// });

appInit().then((app) =>
  app.listen(process.env.PORT, () => {
    console.info(
      `App is listening at http//${process.env.HOST}:${process.env.PORT}`
    );
  })
);

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
