import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";
import ApiError from "../lib/classes/ApiError";
import BaseResponse from "../lib/classes/BaseResponse";
import AuthenticatedResponse from "../lib/classes/AuthenticatedResponse";
import { IUserResults } from "../lib/ts/user.interface";
import User from "../model/user";
import jwt from "jsonwebtoken";

const updateLoginTime = (req, res) => {};

const createNewUser = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const user = await User.create({
      email,
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
  try {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Email not found");
    }

    const passwordMatch = await user?.validatePassword(password, user.password);
    if (passwordMatch == false) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Invalid password");
    }

    // update login date
    await User.update({ loginAt: new Date() }, { where: { email } });

    const userResults: IUserResults = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = jwt.sign(userResults, process.env.JWT_SECRET!, {
      expiresIn: "1d",
      issuer: "test.com",
      subject: "userInfo",
    });
    res.cookie("token", token, {
      httpOnly: true,
      expires: dayjs().add(5, "days").toDate(),
    });

    return new AuthenticatedResponse(StatusCodes.OK, userResults, token);
  } catch (err) {
    next(new ApiError(err.statusCode, err.message));
  }
};

export { updateLoginTime, createNewUser, getAllUsers, authenticate };
