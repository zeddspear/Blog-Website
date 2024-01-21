var express = require("express");
var router = express.Router();
var comment_controller = require("../controller/comment_controller");

router.get("/detail", comment_controller.get_comment);

module.exports = router;
