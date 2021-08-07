import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";
import ApiError from "../lib/classes/ApiError";
import BaseResponse from "../lib/classes/BaseResponse";
import AuthenticatedResponse from "../lib/classes/AuthenticatedResponse";
import { IUserResults } from "../lib/ts/user.interface";
import { ValidationError } from "sequelize";
import User from "../model/user";
import jwt from "jsonwebtoken";

export {
  createNewUser,
  getAllUsers,
  authenticate,
  register,
  updateUser,
  getUser,
};

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

const getUser = async (req, res, next) => {
  try {
  } catch (err) {}
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    return new BaseResponse(StatusCodes.OK, users);
  } catch (err) {}
};

const authenticate = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase().trim();
    console.log(email);
    const password = req.body.password;
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Email not found");
    }

    const passwordMatch = await user?.validatePassword(password, user.password);
    if (passwordMatch == false) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Invalid password");
    }

    if (user.status === "D") {
      throw new ApiError(StatusCodes.FORBIDDEN, "Account is deleted");
    }
    if (user.status !== "A") {
      throw new ApiError(StatusCodes.FORBIDDEN, "Account is disabled");
    }

    // update login date
    await User.update({ loginAt: new Date() }, { where: { email } });

    const userResults: IUserResults = {
      id: user.id,
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

const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const isExistUer = await User.count({ where: { email: email } });
    if (isExistUer > 0) {
      throw new ApiError(StatusCodes.CONFLICT, "User exists");
    }

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
    });

    return new BaseResponse(StatusCodes.CREATED, user);
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    } else {
      next(new ApiError(err.statusCode, err.message));
    }
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id, firstName, lastName, status } = req.body;

    const user = await User.update(
      { firstName, lastName, status },
      { where: { id } }
    );

    console.log(user);

    return new BaseResponse(StatusCodes.OK, "User updated");
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    } else {
      next(new ApiError(err.statusCode, err.message));
    }
  }
};
