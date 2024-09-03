import fs from "fs";
import path from "path";
import { downscaleByResolution } from "./Utils/DownscaleByResolution.js";
import { downscaleBySize } from "./Utils/DownscaleBySize.js";
import { logger } from "./Utils/Logging.js";
import { promptUser } from "./Utils/Prompts.js";

const processImages = (srcDir, destDir, options) => {
  logger.info(`Scanning directory: ${srcDir}`);
  fs.readdir(srcDir, (err, files) => {
    if (err) {
      logger.error(`Error reading directory ${srcDir}: ${err.message}`);
      return;
    }

    files.forEach((file) => {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);

      fs.stat(srcPath, (err, stats) => {
        if (err) {
          logger.error(`Error getting stats of ${srcPath}: ${err.message}`);
          return;
        }

        if (stats.isDirectory()) {
          fs.mkdir(destPath, { recursive: true }, (err) => {
            if (err) {
              logger.error(
                `Error creating directory ${destPath}: ${err.message}`
              );
              return;
            }
            processImages(srcPath, destPath, options);
          });
        } else if (stats.isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
          if (options.downscaleOption === "By Size") {
            const maxSizeInBytes = options.maxSize * 1024 * 1024;
            downscaleBySize(srcPath, destPath, maxSizeInBytes);
          } else if (options.downscaleOption === "By Resolution") {
            const [maxWidth, maxHeight] = options.resolution
              .split(",")
              .map(Number);
            downscaleByResolution(srcPath, destPath, maxWidth, maxHeight);
          }
        }
      });
    });
  });
};

const main = async () => {
  const options = await promptUser();
  processImages(options.inputDir, options.outputDir, options);
};

main();
