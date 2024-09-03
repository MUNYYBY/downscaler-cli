import { logger } from './Utils/Logging';
import { processImages } from './Utils/Process';
import { promptUser } from './Utils/Prompts';

const main = async (): Promise<void> => {
  logger.info('Starting the image downscaling process...');
  const options = await promptUser();
  processImages(options.inputDir, options.outputDir, options);
};

main();
