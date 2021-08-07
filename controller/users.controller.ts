import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";
import ApiError from "../lib/classes/ApiError";
import BaseResponse from "../lib/classes/BaseResponse";
import User from "../model/user";

const updateLoginTime = (req, res) => {};

const createNewUser = async (req, res, next) => {
  const { username, password, firstName, lastName } = req.body;
  try {
    const user = await User.create({
      username,
      password,
      firstName,
      lastName,
    });

    return new BaseResponse(StatusCodes.CREATED, user);
  } catch (err) {
    next(new ApiError(StatusCodes.CONFLICT, err.parent.message));
  }
};

const getAllUsers = async ({ req, next }) => {
  try {
    const users = await User.findAll();
    return new BaseResponse(StatusCodes.OK, users);
  } catch (err) {}
};

const authenticate = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    const passwordMatch = await user?.validatePassword(password, user.password);
    if (passwordMatch == false) {
      throw new Error("Wrong password");
    }

    return new BaseResponse(StatusCodes.OK, user);
  } catch (err) {
    next(new ApiError(StatusCodes.NOT_FOUND, err.message));
  }
};

export { updateLoginTime, createNewUser, getAllUsers, authenticate };
