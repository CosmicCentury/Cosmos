import BaseResponse from "./BaseResponse";

export default class AuthenticatedResponse extends BaseResponse {
  token: any;
  constructor(statusCode: number, data: any, token: any) {
    super(statusCode, data);
    this.token = token;
  }
}
