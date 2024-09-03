# Image Downscaler CLI

## Description

This CLI tool/script allows you to select a folder that may contain any number of nested folders and images within them. The script downscales the images based on size, ensuring that the maximum file size is below 1.5 MB while maintaining the original aspect ratio and quality as much as possible. The processed images are saved with the same folder structure and filenames but in a different parent folder.

## Features

- Recursively scans a directory and all its nested subdirectories for images.
- Downscales images to ensure they do not exceed a specified size limit (default: 1.2 MB).
- Maintains the original folder structure and filenames for the processed images.
- Supports common image formats like JPEG and PNG.

## Requirements

- Node.js (version 12 or higher)
- npm (Node Package Manager)

### Dependencies

This script relies on the following npm packages:

- `sharp`: An advanced image processing library for Node.js.
- `fs` and `path`: Built-in Node.js modules for interacting with the file system and handling file paths.

To install the required npm packages, use the following command:

`npm install sharp`

## Installation

1.Clone this repository to your local machine:

    bash

    Copy code

    `git clone https://github.com/MUNYYBY/images-downscaler-cli.git`

2.Navigate to the directory:

    bash

    Copy code

    `cd images-downscaler-cli`

3.Install the dependencies:

    bash

    Copy code

    `npm install`

## Usage

1.Prepare Your Directories:

    - Place the images you want to downscale in a parent folder.
    - Create a separate folder where you want the processed images to be saved.

2.Configure the Script:

        - Open the script file (`index.js`) in a text editor.
        - Update the `inputDir` variable with the path to your parent folder containing the images.
        - Update the `outputDir` variable with the path to the folder where you want to save the downscaled images.

        Example:

        javascript

        Copy code

        `const inputDir = path.join(__dirname, 'PATH_TO_IMAGES'); // Replace with your parent folder path

    const outputDir = path.join(\_\_dirname, 'OUTPUT_PATH'); // Replace with your desired output folder path`

3.Run the Script:

    - Execute the script using Node.js:

    bash

    Copy code

    `node index.js`

    The script will recursively scan the specified parent folder, downscale any images found, and save them in the designated output folder with the same structure and filenames.

4.Check the Output:

    - After the script completes, navigate to the output folder to verify that the images have been successfully downscaled and saved.

## Example

Suppose you have the following folder structure:

Copy code

`parent_folder/
│
├── subfolder1/
│   ├── image1.jpg
│   └── image2.png
│
├── subfolder2/
│   ├── subsubfolder1/
│   │   └── image3.jpg
│   └── image4.png
└── image5.jpg`

After running the script, if you set the `outputDir` to `downscaled_images/`, you will get:

Copy code

`downscaled_images/
│
├── subfolder1/
│   ├── image1.jpg
│   └── image2.png
│
├── subfolder2/
│   ├── subsubfolder1/
│   │   └── image3.jpg
│   └── image4.png
└── image5.jpg`

The images will be downscaled but will retain their original names and directory structure.

## Notes

- The script will attempt to reduce image size by adjusting quality until the file size is below the specified limit.
- It's recommended to test the script on a smaller set of images before processing a large directory.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contributing

Feel free to open issues or submit pull requests if you would like to contribute to this project.

## Contact

For any questions or issues, please open an issue on the GitHub repository or contact the maintainer directly.
