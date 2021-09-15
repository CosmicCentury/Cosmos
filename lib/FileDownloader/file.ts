import fs from "fs";
import https from "https";
import http from "http";
import { basename } from "path";
import { URL } from "url";
import got from "got";
import Utils from "./utils";
import path from "path";
import ApiError from "../classes/ApiError";
import { StatusCodes } from "http-status-codes";

class File extends Utils {
  protected downloadLocation: string;
  constructor(
    downloadLocation: string = path.resolve(__dirname, "../../media")
  ) {
    super();
    this.downloadLocation = downloadLocation;
  }

  downloadFile(url) {
    if (!url) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Url is undefined");
    }

    return new Promise(async (resolve, reject) => {
      const res = await got(url, { isStream: true });
      const filenameWithExtension = res.options.url.pathname
        .split("/")
        .find((x) => x.match(/[A-Za-z0-9_\-\.]+\.[A-Za-z0-9]+$/i));

      if (!fs.existsSync(this.downloadLocation)) {
        fs.mkdirSync(this.downloadLocation);
      }

      if (fs.existsSync(`${this.downloadLocation}/${filenameWithExtension}`)) {
        resolve(`${this.downloadLocation}/${filenameWithExtension}`);
      }

      const writeStream = fs.createWriteStream(
        `${this.downloadLocation}/${filenameWithExtension}`
      );
      res.pipe(writeStream);
      res.on("end", () => {
        console.log(`Downloaded ${filenameWithExtension}`);
        resolve(`${this.downloadLocation}/${filenameWithExtension}`);
      });

      // return `${this.downloadLocation}/${filenameWithExtension}`;
    });
  }

  deleteFile(filename: string) {}
}

export default File;
