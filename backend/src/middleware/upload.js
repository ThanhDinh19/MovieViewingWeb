const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.mimetype.startsWith("image")) {
      return {
        folder: "movies/images",
        allowed_formats: ["jpg", "png", "jpeg"],
        resource_type: "image",
      };
    }

    if (file.mimetype.startsWith("video")) {
      return {
        folder: "movies/videos",
        allowed_formats: ["mp4", "mov"],
        resource_type: "video",
      };
    }
  },
});

const upload = multer({ storage });

module.exports = upload;
