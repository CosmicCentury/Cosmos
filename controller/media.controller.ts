import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";

import BaseResponse from "../lib/classes/BaseResponse";
import Video from "../lib/FileDownloader/video";
import path from "path";
import { ExpressHandler } from "../lib/ts/api.interface";
import MediaResponse from "../lib/classes/MediaResponse";
import Scrapper from "../lib/FileDownloader/scrapper";
import ApiError from "../lib/classes/ApiError";
import File from "../lib/FileDownloader/file";
export { downloadFile, scrapeWebsiteVideo };

const downloadFile: ExpressHandler = async (req, res, next) => {
  try {
    const fileObj = new File();

    const downloadedFile = await fileObj.downloadFile(req.body.url);

    return new MediaResponse(StatusCodes.OK, downloadedFile);
  } catch (err: any) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
  }
};

const scrapeWebsiteVideo: ExpressHandler = async (req, res, next) => {
  try {
    const scrapperObj = new Scrapper(req.body.src);
    const videoSrc = await scrapperObj.scrapePage();

    const videoObj = new Video();

    const downloadedVideo = await videoObj.downloadFile(videoSrc);

    return new MediaResponse(StatusCodes.OK, downloadedVideo);
  } catch (err: any) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
  }
};
