var express = require("express");
var router = express.Router();
var categories_controller = require("../controller/categories_controller");

router.get("/", categories_controller.get_categories);

router.post("/", categories_controller.post_category);

module.exports = router;
