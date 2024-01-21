let jwt = require("jsonwebtoken");
let dotenv = require("dotenv");

dotenv.config();

exports.authenticateToken = (req, res, next) => {
  let authHeader = req.headers["authorization"];
  let token = authHeader;
  let splitToken = token.split(" ")[1];

  if (splitToken === null) {
    return res.status(401).json({ msg: "token is missing" });
  }

  jwt.verify(splitToken, process.env.ACCESS_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(403).json({ msg: "Invalid Token" });
    }

    req.user = user;
    next();
  });
};
