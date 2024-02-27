var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var cors = require("cors");

dotenv.config();

const DB_URI = process.env.DB_URI;

var adminRouter = require("../routes/admin");
var categoriesRouter = require("../routes/categories");
var uploadRouter = require("../routes/fileupload");
var createRouter = require("../routes/create");
var blogsRouter = require("../routes/blogs");
var commentRouter = require("../routes/comment");

var app = express();

app.use(
  cors({
    origin: "*",
  })
);

// connecting to mongodb using dot version
mongoose
  .connect(DB_URI)
  .then((res) => console.log("DB is connected succussfully."))
  .catch((err) => console.log(`Error while connecting with the DB: ${err}`));

app.use(logger("dev"));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../client/dist/")));

app.use("/api/admin", adminRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/create", createRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/comment", commentRouter);

app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

module.exports = app;
