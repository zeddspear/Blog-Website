var express = require("express");
var router = express.Router();
var upload_controller = require("../controller/upload_controller");
var upload = require("../utils/upload");

// using middleware to upload image on mongodb
router.post("/file", upload.single("file"), upload_controller.post_file);

router.get("/file/:filename", upload_controller.get_file);

module.exports = router;
