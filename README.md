# Images Downscaler CLI

## Description

This CLI tool/script allows you to select a folder that may contain any number of nested folders and images within them. The script downscales the images either based on size (e.g., ensuring that the maximum file size is below 1.5 MB) or based on resolution (e.g., resizing images to a specific width and height). The processed images are saved with the same folder structure and filenames but in a different parent folder. The script also features detailed logging to track the processing of each image.

## Features

- Recursively scans a directory and all its nested subdirectories for images.
- Downscales images based on size (default: 1.5 MB) or resolution while maintaining the original aspect ratio.
- Maintains the original folder structure and filenames for the processed images.
- Supports common image formats like JPEG and PNG.
- Detailed logging of the processing steps, including errors, warnings, and file details.

## Requirements

- Node.js (version 12 or higher)
- npm (Node Package Manager)

### Dependencies

This script relies on the following npm packages:

- `sharp`: An advanced image processing library for Node.js.
- `inquirer`: A library for creating interactive command-line interfaces.
- `winston`: A versatile logging library for Node.js.
- `fs` and `path`: Built-in Node.js modules for interacting with the file system and handling file paths.

To install the required npm packages, use the following command:

```bash
npm install
```

## Installation

1.Clone this repository to your local machine:

bash

Copy code

`git clone https://github.com/MUNYYBY/images-downscaler-cli.git`

2.Navigate to the directory:

bash

Copy code

`cd image-downscaler-cli`

3.Install the dependencies:

bash

Copy code

`npm install`

## Usage

1.**Prepare Your Directories:**

- Place the images you want to downscale in a parent folder. - Create a separate folder where you want the processed images to be saved.

  2.**Run the Script:**

- Execute the script using Node.js:

  bash

  Copy code

  `node script.mjs`

  The script will prompt you to provide the following information:

- The path to the parent folder containing the images.
- The path to the output folder where processed images will be saved.
- Whether you want to downscale the images by size or by resolution.
- If by size, the maximum file size in MB.
- If by resolution, the maximum width and height.

The script will then recursively scan the specified parent folder, downscale any images found, and save them in the designated output folder with the same structure and filenames.

3.**Check the Output:**

After the script completes, navigate to the output folder to verify that the images have been successfully downscaled and saved.

4.**Review the Logs:**

Check the console for real-time logs or refer to the `image-downscaler.log` file for detailed logs of the processing.

## Notes

- The script will attempt to reduce image size by adjusting quality until the file size is below the specified limit.
- It's recommended to test the script on a smaller set of images before processing a large directory.
- Detailed logs are available both in the console and in the `image-downscaler.log` file for troubleshooting and record-keeping.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contributing

Feel free to open issues or submit pull requests if you would like to contribute to this project.

## Contact

For any questions or issues, please open an issue on the GitHub repository or contact the maintainer directly.

markdown

Copy code

`### Key Updates:

1. **Usage Instructions**:

The updated instructions reflect the dynamic prompts that the script now uses to collect user inputs.

2.**Logging Information**:

The `Usage` and `Notes` sections now include details about the logging feature, advising users to check the logs for more information on the processing.

3.**Dependencies**:

The `winston` package has been added to the list of dependencies, and installation instructions have been updated accordingly.

4.**Execution**:

- The instructions now mention the script's file name (`script.mjs`) assuming the script is saved with this name to follow the ECMAScript Module format.`
