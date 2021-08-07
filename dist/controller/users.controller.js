"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.getAllUsers = exports.createNewUser = exports.updateLoginTime = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../lib/classes/ApiError"));
const BaseResponse_1 = __importDefault(require("../lib/classes/BaseResponse"));
const user_1 = __importDefault(require("../model/user"));
const updateLoginTime = (req, res) => { };
exports.updateLoginTime = updateLoginTime;
const createNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstName, lastName } = req.body;
    try {
        const user = yield user_1.default.create({
            username,
            password,
            firstName,
            lastName,
        });
        return new BaseResponse_1.default(http_status_codes_1.StatusCodes.CREATED, user);
    }
    catch (err) {
        next(new ApiError_1.default(http_status_codes_1.StatusCodes.CONFLICT, err.parent.message));
    }
});
exports.createNewUser = createNewUser;
const getAllUsers = ({ req, next }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        return new BaseResponse_1.default(http_status_codes_1.StatusCodes.OK, users);
    }
    catch (err) { }
});
exports.getAllUsers = getAllUsers;
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ where: { username } });
        const passwordMatch = yield (user === null || user === void 0 ? void 0 : user.validatePassword(password, user.password));
        if (passwordMatch == false) {
            throw new Error("Wrong password");
        }
        return new BaseResponse_1.default(http_status_codes_1.StatusCodes.OK, user);
    }
    catch (err) {
        next(new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, err.message));
    }
});
exports.authenticate = authenticate;
//# sourceMappingURL=users.controller.js.map