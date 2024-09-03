const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(__dirname, "./rooms"); // replace with your parent folder path
const outputDir = path.join(__dirname, "./output"); // replace with your desired output folder path

const maxSizeInBytes = 1.2 * 1024 * 1024; // Maximum file size: 1.2 MB

function processImages(srcDir, destDir) {
  fs.readdir(srcDir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${srcDir}: ${err.message}`);
      return;
    }

    files.forEach((file) => {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);

      fs.stat(srcPath, (err, stats) => {
        if (err) {
          console.error(`Error getting stats of ${srcPath}: ${err.message}`);
          return;
        }

        if (stats.isDirectory()) {
          fs.mkdir(destPath, { recursive: true }, (err) => {
            if (err) {
              console.error(
                `Error creating directory ${destPath}: ${err.message}`
              );
              return;
            }
            processImages(srcPath, destPath);
          });
        } else if (stats.isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
          downscaleImage(srcPath, destPath);
        }
      });
    });
  });
}

function downscaleImage(srcPath, destPath, quality = 80) {
  sharp(srcPath)
    .jpeg({ quality })
    .toBuffer()
    .then((data) => {
      if (data.length > maxSizeInBytes && quality > 10) {
        // Reduce quality and try again if the image is still too large
        downscaleImage(srcPath, destPath, quality - 10);
      } else {
        // Save the image once it's below the maximum size
        fs.writeFile(destPath, data, (err) => {
          if (err) {
            console.error(`Error saving file ${destPath}: ${err.message}`);
          } else {
            console.log(`Processed and saved: ${destPath}`);
          }
        });
      }
    })
    .catch((err) => {
      console.error(`Error processing file ${srcPath}: ${err.message}`);
    });
}

// Start processing from the input directory, saving to the output directory
processImages(inputDir, outputDir);
