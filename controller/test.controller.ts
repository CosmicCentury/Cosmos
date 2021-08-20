import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";
import ApiError from "../lib/classes/ApiError";
import BaseResponse from "../lib/classes/BaseResponse";
import AuthenticatedResponse from "../lib/classes/AuthenticatedResponse";
import { IUserResults } from "../lib/ts/user.interface";
import { ValidationError } from "sequelize";
import User from "../model/user";
import jwt from "jsonwebtoken";
import { newTest } from "../index";

export { latest };

const latest = async (req, res, next) => {
  console.log(newTest);
};
