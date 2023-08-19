const multer = require("multer");
const fs = require('fs');

const uploadDirectory = 'public/images';

// Create the upload directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;