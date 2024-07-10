import m3u8stream from "m3u8stream";
import axios from "axios";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import progress from "progress-stream";
import readline from "readline";
import path from "path";
import hbjs, { HandbrakeErrors } from "handbrake-js";

class Downloader {
  tmpOutputPath: string;
  newOutputPath: string;
  constructor(tmpOutputPath: string, newOutputPath: string) {
    this.tmpOutputPath = tmpOutputPath;
    this.newOutputPath = newOutputPath;
  }

  downloadStream = async (url: string, outputName: string, index: number) => {
    console.clear();
    process.stdout.clearScreenDown();
    return new Promise<void>((resolve, reject) => {
      const stream = m3u8stream(url);
      const writer = fs.createWriteStream(outputName);

      stream.pipe(writer);

      stream.on("progress", (prog, totalSegments, downloadedBytes) => {
        readline.cursorTo(process.stdout, 0, index);
        readline.clearLine(process.stdout, 0);

        process.stdout.write(
          `${outputName}: Downloading segment ${
            prog.num
          } of ${totalSegments}. Total bytes downloaded: ${downloadedBytes}. Percentage Downloaded: ${(
            (prog.num / totalSegments) *
            100
          ).toFixed(2)}%`
        );
      });

      // prog.on("progress", (p) => {
      //   readline.cursorTo(process.stdout, 0, index);
      //   readline.clearLine(process.stdout, 0);

      //   process.stdout.write(
      //     `${outputName}: ${p.transferred} bytes transferred. Runtime: ${p.runtime}`
      //   );
      // });

      stream.on("error", (error) => {
        console.error("Error streaming the content:", error);
        reject(error);
      });

      writer.on("finish", async () => {
        readline.cursorTo(process.stdout, 0, index);
        readline.clearLine(process.stdout, 0);
        process.stdout.write(
          `Download completed for ${outputName}. Starting transcoding...\n`
        );

        await this.transcodeVideo(
          outputName,
          outputName.replace(".mp4", "_transcoded.mp4"),
          index
        )
          .then(() => resolve())
          .catch((err) => reject(err));
      });
    });
  };

  transcodeVideo = async (
    inputPath: string,
    outputPath: string,
    index: number
  ) => {
    return new Promise<void>((resolve, reject) => {
      hbjs
        .spawn({
          input: inputPath,
          output: outputPath,
          encoder: "nvenc_h264",
          rate: 30,
          height: 720,
        })
        .on("error", (err) => {
          console.error("Error during transcoding:", err.message);
          reject(err);
        })
        .on("progress", (progress) => {
          readline.cursorTo(process.stdout, 0, index);
          readline.clearLine(process.stdout, 0);
          process.stdout.write(
            `Transcoding ${outputPath}: ${progress.percentComplete}% complete, ` +
              `FPS: ${progress.fps}`
          );
        })
        .on("end", async () => {
          readline.cursorTo(process.stdout, 0, index);
          readline.clearLine(process.stdout, 0);
          process.stdout.write(`Transcoding finished for ${outputPath}`);
          await fs.promises.unlink(inputPath);
          if (this.newOutputPath) {
            await fs.promises.rename(
              outputPath,
              `${this.newOutputPath}/${path.basename(outputPath)}`
            );
          }
          resolve();
        });
    });
  };

  downloadM3U8 = async (
    urls: { url: string; originalUrl: string; displayName: string }[]
  ) => {
    const responses = await Promise.all(
      urls.map(async (i) => {
        const d = await axios.get(i.url);
        return {
          url: i,
          data: d.data,
        };
      })
    );

    if (responses.length > 0) {
      console.log("Starting parallel downloads...");

      const downloadPromises = responses.map((i, index) => {
        const filename = i.url.displayName
          ? `${i.url.displayName}.mp4`
          : `${uuidv4()}.mp4`;
        return this.downloadStream(
          i.url.url,
          `${this.tmpOutputPath}/${filename}`,
          index + 1
        );
      });

      try {
        await Promise.all(downloadPromises);
        console.log("\nAll downloads and transcoding completed.");
      } catch (error) {
        console.error(
          "An error occurred during downloads or transcoding:",
          error
        );
      }
    } else {
      console.log("No url to download");
    }
  };
}

export default Downloader;
