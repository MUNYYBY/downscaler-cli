import fs from "fs";
import inquirer from "inquirer";
import { logger } from "./Logging.js";

export const promptUser = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "inputDir",
      message: "Enter the path to the parent folder containing the images:",
      validate: function (input) {
        if (fs.existsSync(input)) {
          return true;
        } else {
          return "Please enter a valid directory path.";
        }
      },
    },
    {
      type: "input",
      name: "outputDir",
      message:
        "Enter the path to the output folder where processed images will be saved:",
      validate: function (input) {
        if (input) {
          return true;
        } else {
          return "Please enter a valid output directory path.";
        }
      },
    },
    {
      type: "list",
      name: "downscaleOption",
      message: "How would you like to downscale the images?",
      choices: ["By Size", "By Resolution"],
    },
    {
      type: "input",
      name: "maxSize",
      message: "Enter the maximum file size in MB (e.g., 1.5 for 1.5 MB):",
      when: (answers) => answers.downscaleOption === "By Size",
      validate: function (input) {
        const size = parseFloat(input);
        if (size > 0) {
          return true;
        } else {
          return "Please enter a valid size greater than 0.";
        }
      },
    },
    {
      type: "input",
      name: "resolution",
      message: "Enter the maximum resolution as width,height (e.g., 800,600):",
      when: (answers) => answers.downscaleOption === "By Resolution",
      validate: function (input) {
        const parts = input.split(",");
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          return true;
        } else {
          return "Please enter a valid resolution in the format width,height.";
        }
      },
    },
  ]);

  logger.info("User input received.");
  return answers;
};
