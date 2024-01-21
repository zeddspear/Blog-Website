var express = require("express");
var router = express.Router();
var create_controller = require("../controller/create_controller");
var jwt_controller = require("../controller/jwt_controller");

router.post(
  "/blog",
  jwt_controller.authenticateToken,
  create_controller.post_blog
);

router.post("/comment", create_controller.post_comment);

module.exports = router;
