var express = require("express");
var router = express.Router();
var blogs_controller = require("../controller/blogs_controller");
var jwt_controller = require("../controller/jwt_controller");

router.get("/", blogs_controller.get_blogs);

router.get("/detail", blogs_controller.get_single_blog);

router.post(
  "/delete",
  jwt_controller.authenticateToken,
  blogs_controller.delete_blog
);

router.post("/edit", blogs_controller.edit_blog);

module.exports = router;
