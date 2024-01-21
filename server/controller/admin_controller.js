const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Admin = require("../models/admin");
const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

exports.get_blogs_admin = asyncHandler(async (req, res, next) => {
  res.send("Here all blogs will show but in admin panel.");
});

exports.post_admin_signup = [
  body("firstname", "First Name must be of 3 characters atleast.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("lastname", "Last Name must be of 3 characters atleast.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("email", "Email should be a valid email").isEmail(),
  body("password", "Password should be atleast of 8 characters")
    .trim()
    .isLength({ min: 8 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (!errors.isEmpty()) {
        res.status(500).json(errors.array());
      } else {
        try {
          const admin = new Admin({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword,
          });

          const result = await admin.save();

          return res.status(200).json({ msg: "SignUp successfully!" });
        } catch (err) {
          return res.status(500).json({ msg: "Error while sign up the user" });
        }
      }
    });
  }),
];

exports.post_admin_signin = [
  body("email", "Email should be a valid email").isEmail(),
  body("password", "Password should be atleast of 8 characters")
    .trim()
    .isLength({ min: 8 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(500).json(errors.array());
    } else {
      const admin = await Admin.findOne({ email: req.body.email }).exec();

      if (!admin) {
        return res.status(400).json({
          msg: "User is not available with this email please Sign Up.",
        });
      }

      try {
        let match = await bcrypt.compare(req.body.password, admin.password);

        if (match) {
          const accessToken = jwt.sign(
            admin.toJSON(),
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: "15m" }
          );

          const refreshToken = jwt.sign(
            admin.toJSON(),
            process.env.REFRESH_SECRET_KEY
          );

          // const isAdminRefreshAvail = await Token.findOne({
          //   admin: admin._id,
          // }).exec();

          //  if (isAdminRefreshAvail) {
          let token = new Token({
            token: refreshToken,
            admin: admin,
          });

          await token.save();
          //}

          res.status(200).json({
            AccessToken: accessToken,
            RefreshToken: refreshToken,
            name: admin.fullname,
            email: admin.email,
            adminID: admin._id,
          });
        } else {
          return res
            .status(400)
            .json({ msg: "Password does not match please try again." });
        }
      } catch (error) {
        return res.status(500).json({ msg: "Error occured while logging in." });
      }
    }
  }),
];

exports.get_sign_out = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ msg: "Logged Out" });
});
