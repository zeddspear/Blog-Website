const { response } = require("express");
const asyncHandler = require("express-async-handler");
const grid = require("gridfs-stream");
const mongoose = require("mongoose");
const url = "https://blog-website-53mq.onrender.com";

const conn = mongoose.connection;

let gridfsbucket;
let gfs;

conn.once("open", () => {
  gridfsbucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

exports.post_file = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return res.status(404).json({ msg: "File not found" });
  }

  const imageUrl = `${url}/api/upload/file/${req.file.filename}`;

  return res.status(200).json(imageUrl);
});

exports.get_file = asyncHandler(async (req, res, next) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridfsbucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
