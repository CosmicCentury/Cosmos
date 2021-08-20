import "dotenv/config";
import { init } from "./config/express";
import test from "./lib/classes/test";

const app = init();

require("./config/dbManager").init();

export const newTest = new test({
  unctr_cost: [
    {
      updateDate: "2020-12-31T16:00:00Z",
      effectiveStartDate: "2020-12-31T16:00:00Z",
      effectiveEndDate: "--",
      username: "user1",
      value: 13.35,
      status: "Active",
    },
  ],
  cap_contract: [
    {
      updateDate: "2020-12-31T16:00:00Z",
      effectiveStartDate: "2021-10-09T16:00:00Z",
      effectiveEndDate: "--",
      username: "user6",
      value: 23,
      status: "Scheduled",
    },
    {
      updateDate: "2020-12-31T16:00:00Z",
      effectiveStartDate: "2021-07-09T16:00:00Z",
      effectiveEndDate: "2021-10-08T16:00:00Z",
      username: "user5",
      value: 22,
      status: "Active",
    },
    {
      updateDate: "2020-12-31T16:00:00Z",
      effectiveStartDate: "2021-06-09T16:00:00Z",
      effectiveEndDate: "2021-07-08T16:00:00Z",
      username: "user4",
      value: 21,
      status: "History",
    },
    {
      updateDate: "2020-12-31T16:00:00Z",
      effectiveStartDate: "2021-05-09T16:00:00Z",
      effectiveEndDate: "2021-06-08T16:00:00Z",
      username: "user3",
      value: 20,
      status: "History",
    },
    {
      updateDate: "2020-12-31T16:00:00Z",
      effectiveStartDate: "2021-04-09T16:00:00Z",
      effectiveEndDate: "2021-05-08T16:00:00Z",
      username: "user2",
      value: 19,
      status: "History",
    },
    {
      updateDate: "2020-12-31T16:00:00Z",
      effectiveStartDate: "2021-03-09T16:00:00Z",
      effectiveEndDate: "2021-04-08T16:00:00Z",
      username: "user1",
      value: 18,
      status: "History",
    },
  ],
});

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
