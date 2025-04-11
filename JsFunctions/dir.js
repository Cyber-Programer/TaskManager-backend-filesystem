const fs = require("fs");
const path = require("path");

// function ckDirAvailable() {
//   const dirPath = path.join(__dirname, '/../Folder');
//   return new Promise((resolve, reject) => {
//     fs.access(dirPath, (err) => {
//       if (err) {
//         fs.mkdir(dirPath, { recursive: true }, (err) => {
//           err ? reject(err) : resolve('Directory created');
//         });
//       } else {
//         resolve("Directory already exists");
//       }
//     });
//   });
// }

function userMkdir(username) {
  if (typeof username === "string") {
    const dirPath = path.join(__dirname, "/../Folder/" + username);
    return new Promise((resolve, reject) => {
      fs.access(dirPath, (err) => {
        if (err) {
          fs.mkdir(dirPath, { recursive: true }, (err) => {
            err ? reject(err) : resolve("Directory created");
          });
        } else {
          resolve("Directory already exists");
        }
      });
    });
  } else {
    return Promise.reject(new Error("Username must be a string"));
  }
}

function createFile(username, fileName, data) {
  const dirPath = path.join(__dirname, "/../Folder/" + username);
  return new Promise((resolve, reject) => {
    fs.access(dirPath, (err) => {
      if (err) {
        userMkdir(username)
          .then(() => {
            const filePath = path.join(dirPath, fileName);
            fs.writeFile(filePath, data, (err) => {
              err ? reject(err) : resolve("File created");
            });
          })
          .catch(reject);
      } else {
        const filePath = path.join(dirPath, fileName);
        fs.writeFile(filePath, data, (err) => {
          err ? reject(err) : resolve("File created");
        });
      }
    });
  });
}

async function showAllFiles(username) {
  const fileNames = [];
  const filedata = [];
  const dirPath = path.join(__dirname, "/../Folder/" + username);

  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        return reject(err);
      }

      // Store file names
      fileNames.push(...files);

      // Create an array of promises for reading each file
      const readPromises = files.map((file) => {
        const filePath = path.join(dirPath, file);
        return new Promise((resolve, reject) => {
          fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
              return reject(err);
            }
            filedata.push(data);
            resolve(); // Resolve when the file is read
          });
        });
      });

      // Wait for all file read promises to complete
      Promise.all(readPromises)
        .then(() => {
          resolve({
            fileNames,
            filedata,
          });
        })
        .catch(reject); // Handle any read errors
    });
  });
}

module.exports = {
  // ckDirAvailable,
  createFile,
  showAllFiles,
};
