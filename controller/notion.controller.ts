import { StatusCodes } from "http-status-codes";
import BaseResponse from "../lib/classes/BaseResponse";
import { ExpressHandler } from "../lib/ts/api.interface";
import { Client } from "@notionhq/client";

const getAllPages: ExpressHandler = async (req, res, next) => {
  const notion = new Client({
    auth: "secret_bC1o1ipezAKuoKqwPGTXYFUmyQB2hGPv8gEfJdQdfS9",
  });

  const t = await notion.databases.query({
    database_id: "d3beb320ed6d4c4a935c5403e7eeda0c",
  });

  console.log(JSON.stringify(t, null, 2));

  return new BaseResponse(StatusCodes.OK, "ok");
};

export { getAllPages };
