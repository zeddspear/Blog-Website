var express = require("express");
var router = express.Router();
const admin_controller = require("../controller/admin_controller");

/* GET home page. */
router.get("/", admin_controller.get_blogs_admin);

router.post("/sign-up", admin_controller.post_admin_signup);

router.post("/sign-in", admin_controller.post_admin_signin);

router.get("/sign-out", admin_controller.get_sign_out);

module.exports = router;
