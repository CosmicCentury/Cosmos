import BaseResponse from "./BaseResponse";

class MediaResponse extends BaseResponse {
  constructor(statusCode: number, data: any) {
    super(statusCode, data);
  }
}

export default MediaResponse;
