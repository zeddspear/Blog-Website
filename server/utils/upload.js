var { GridFsStorage } = require("multer-gridfs-storage");
var multer = require("multer");
var dotenv = require("dotenv");

dotenv.config();

const DB_URI = process.env.DB_URI;

const storage = new GridFsStorage({
  url: DB_URI,
  file: (req, file) => {
    const match = ["image/png", "image/jpg"];

    if (match.indexOf(file.memeType) === -1) {
      return `${Date.now()}-blog-${file.originalname}`;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage });
