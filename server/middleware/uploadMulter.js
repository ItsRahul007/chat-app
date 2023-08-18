const multer = require("multer");
const fs = require('fs');

const uploadDirectory = './server/images';

// Create the upload directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
  }

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.fieldname + "_" + Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;