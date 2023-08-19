const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const upload = require("../middleware/uploadMulter");
const UserSchema = require("../schema/UserSchema");

// Simulate storing previous image names
const imageNames = new Map();

router.post('/uploadImage', fetchUser, upload.single("file"), async (req, res) => {
    const image = {}
    if (!req.file) return;
    image.image = req.file.filename;

    const userId = req.user.id;

    const previousImageName = imageNames.get(userId);

    // Delete the previous image (if applicable)
    if (previousImageName) {
        deleteImage(previousImageName);
    }

    // Store the new image name in the map
    imageNames.set(userId, req.file.filename);
    console.log(imageNames);

    // If user dosn't exites
    const isUser = await UserSchema.findById(userId);
    if (!isUser) return res.status(404).json({ errors: "User Not Found" });


    await UserSchema.findByIdAndUpdate(userId, { $set: image }, { new: true });

    res.json({ success: "Updated successfully" });
});

module.exports = router;