const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment");

exports.get_comment = asyncHandler(async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.query.id).exec();

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found in db" });
    }

    return res.status(200).json(comment);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
