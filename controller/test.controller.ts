import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";
import BaseResponse from "../lib/classes/BaseResponse";
import sse from "../lib/decorator/sse";
import { ExpressHandler } from "../lib/ts/api.interface";

const testApi: ExpressHandler = (req, res, next) => {
  // Function to send a message
  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Send an event every 5 seconds
  const intervalId = setInterval(() => {
    sendEvent({ time: new Date().toTimeString() });
  }, 5000);

  res.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });

  //   const newData = "hi";
  //   return new BaseResponse(StatusCodes.OK, newData);
};

export { testApi };
