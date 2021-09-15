import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";
import BaseResponse from "../lib/classes/BaseResponse";

export { testApi };

const testApi = (req: any, res: any, next: any) => {
  //   console.log(getRoute());
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  return sendAndSleep(res, 5);

  //   const newData = "hi";
  //   return new BaseResponse(StatusCodes.OK, newData);
};
var sendAndSleep = function (response, counter) {
  if (counter > 10) {
    response.end();
  } else {
    response.write(" ;i=" + counter);
    console.log(counter);
    counter++;
    setTimeout(function () {
      sendAndSleep(response, counter);
    }, 1000);
  }
};
