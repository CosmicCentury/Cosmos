require("dotenv").config();
import { init } from "./config/express";

const app = init();

require("./config/dbManager").init();

app.listen(process.env.PORT, () => {
  console.info(
    `App is listening at http//${process.env.HOST}:${process.env.PORT}`
  );
});
