import fs from 'fs';
import path from 'path';
import { UserInput } from '../Types';
import { logger } from './Logging';
import { downscaleBySize } from './DownscaleBySize';
import { downscaleByResolution } from './DownscaleByResolution';

export const processImages = (
  srcDir: string,
  destDir: string,
  options: UserInput,
): void => {
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
                `Error creating directory ${destPath}: ${err.message}`,
              );
              return;
            }
            processImages(srcPath, destPath, options);
          });
        } else if (stats.isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
          if (options.downscaleOption === 'By Size') {
            const maxSizeInBytes = (options.maxSize as number) * 1024 * 1024;
            downscaleBySize(srcPath, destPath, maxSizeInBytes);
          } else if (options.downscaleOption === 'By Resolution') {
            const [maxWidth, maxHeight] = (options.resolution as string)
              .split(',')
              .map(Number);
            downscaleByResolution(srcPath, destPath, maxWidth, maxHeight);
          }
        }
      });
    });
  });
};
