import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";
import ApiError from "../lib/classes/ApiError";
import BaseResponse from "../lib/classes/BaseResponse";
import AuthenticatedResponse from "../lib/classes/AuthenticatedResponse";
import {
  IUserResults,
  IUsersPaginationDetails,
} from "../lib/ts/user.interface";
import { Op, ValidationError } from "sequelize";
import User from "../model/user";
import jwt from "jsonwebtoken";
import { ExpressHandler } from "../lib/ts/api.interface";
import { getPagination, getPagingData } from "../utils/general";
import Roles from "../model/roles";

export {
  createNewUser,
  getAllUsers,
  authenticate,
  register,
  updateUser,
  getUser,
  changePassword,
  resetPassword,
  getroles,
  updateUserRole,
};

const getroles: ExpressHandler = async (req, res, next) => {
  try {
    const roles = await Roles.findAll();

    return new BaseResponse(StatusCodes.ACCEPTED, roles);
  } catch (err) {
    throw new ApiError(StatusCodes.CONFLICT, (err as Error).message);
  }
};

const createNewUser: ExpressHandler = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
    });

    return new BaseResponse(StatusCodes.CREATED, user);
  } catch (err: any) {
    throw new ApiError(StatusCodes.CONFLICT, err.parent.message);
  }
};

const getUser = async (req, res, next) => {
  try {
  } catch (err) {}
};

const getAllUsers: ExpressHandler = async (req, res, next) => {
  try {
    const { page, size, filter, sort } =
      req.query as unknown as IUsersPaginationDetails;

    const { offset, limit } = getPagination(page, size);

    const isFilterExist =
      filter != undefined
        ? {
            email: {
              [Op.like]: `%${filter}%`,
            },
          }
        : {};

    console.log(isFilterExist);

    const users = await User.findAndCountAll({
      where: isFilterExist,
      offset,
      limit,
    });

    const paginationData = getPagingData(users, page, limit);

    return new BaseResponse(StatusCodes.OK, paginationData);
  } catch (err: any) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error");
  }
};

const authenticate: ExpressHandler = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase().trim();
    const password = req.body.password;
    const user = await User.findOne({ where: { email } });
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
      phoneNumber: user.phoneNumber,
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
  } catch (err: any) {
    throw new ApiError(err.statusCode, err.message);
  }
};

const register: ExpressHandler = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body;

    const isExistUer = await User.count({ where: { email: email } });
    if (isExistUer > 0) {
      throw new ApiError(StatusCodes.CONFLICT, "User exists");
    }

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      status: "A",
    });

    return new BaseResponse(StatusCodes.CREATED, user);
  } catch (err: any) {
    if (err instanceof ValidationError) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    } else {
      throw new ApiError(err.statusCode, err.message);
    }
  }
};

const updateUser: ExpressHandler = async (req, res, next) => {
  try {
    const { id, firstName, lastName, status, phoneNumber } = req.body;

    const user = await User.update(
      { firstName, lastName, status, phoneNumber },
      { where: { id } }
    );

    return new BaseResponse(StatusCodes.OK, "User updated");
  } catch (err: any) {
    if (err instanceof ValidationError) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    } else {
      throw new ApiError(err.statusCode, err.message);
    }
  }
};

const changePassword: ExpressHandler = async (req, res, next) => {
  try {
    const { id, password } = req.body;

    await User.update({ password }, { where: { id } });
  } catch (err: any) {
    throw new ApiError(err.statusCode, err.messages);
  }
};

const resetPassword: ExpressHandler = async (req, res, next) => {
  try {
    const { id } = req.body;

    const defaultPassword = "defaultpassword123";

    const user = await User.update(
      { password: defaultPassword },
      { where: { id }, individualHooks: true }
    );

    return new BaseResponse(StatusCodes.OK, "Password resetted");
  } catch (err: any) {
    throw new ApiError(err.statusCode, err.messages);
  }
};

const updateUserRole: ExpressHandler = async (req, res, next) => {
  try {
    const { userId, roleId } = req.body;
  } catch (err: any) {}
};
