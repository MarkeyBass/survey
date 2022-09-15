const fs = require("fs");

class FileService {
  getAllDirsFileNames(path, callback) {
    const dirPath = path.join(__dirname, `survey_documents`);
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        console.log("Unable to read from directory: " + err);
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
}

module.exports = {
  FileService: FileService,
};
