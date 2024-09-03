import fs from 'fs';
import sharp from 'sharp';
import { logger } from './Logging.js';

export const downscaleBySize = async (
  srcPath: string,
  destPath: string,
  maxSizeInBytes: number,
  quality: number = 80,
): Promise<void> => {
  try {
    logger.info(`Downscaling by size: ${srcPath}`);
    const data = await sharp(srcPath).jpeg({ quality }).toBuffer();

    if (data.length > maxSizeInBytes && quality > 10) {
      logger.warn(
        `File size exceeds ${maxSizeInBytes} bytes. Reducing quality to ${
          quality - 10
        }% and retrying...`,
      );
      await downscaleBySize(srcPath, destPath, maxSizeInBytes, quality - 10);
    } else {
      fs.writeFileSync(destPath, data);
      logger.info(
        `Processed and saved: ${destPath} (Size: ${(
          data.length /
          1024 /
          1024
        ).toFixed(2)} MB)`,
      );
    }
  } catch (err) {
    logger.error(`Error processing file ${srcPath}: ${(err as Error).message}`);
  }
};
