import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";
import BaseResponse from "../lib/classes/BaseResponse";
import { AppointmentModel } from "../lib/ts/appointment.interface";

export { getAppointments };

const mockData: AppointmentModel[] = [
  {
    title: "Testing 1",
    startDate: "2021-08-19T01:30:00.000Z",
    endDate: "2021-08-19T05:30:00.000Z",
  },
  {
    title: "Testing 2",
    startDate: "2021-07-18T13:39:34.747Z",
    endDate: "2021-07-20T18:39:34.747Z",
  },
  {
    title: "Testing 3",
    startDate: "2021-08-18T13:39:34.747Z",
    endDate: "2021-08-19T18:39:34.747Z",
  },
  {
    title: "Testing 4",
    startDate: "2021-08-21T13:39:34.747Z",
    endDate: "2021-08-22T18:39:34.747Z",
  },
  {
    title: "Testing 5",
    startDate: "2021-09-18T13:39:34.747Z",
    endDate: "2021-09-20T18:39:34.747Z",
  },
];

console.log(new Date(2021, 6, 18, 9, 30));

const getAppointments = (req: any, res: any, next: any) => {
  //   console.log(getRoute());
  const date = req.query.date;

  const newData = mockData.filter((x) => {
    return dayjs(x.startDate).month() == dayjs(date).month();
  });

  return new BaseResponse(StatusCodes.OK, newData);
};
