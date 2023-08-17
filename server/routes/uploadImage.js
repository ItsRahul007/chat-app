const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const upload = require("../middleware/uploadMulter");

router.post('/uploadImage', [fetchUser, upload.single("file")], (req, res) => {
    console.log(req.file);
});

module.exports = router;