const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Blog = require("../models/blog");

exports.get_blogs = asyncHandler(async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
      .populate("admin")
      .populate({ path: "comments" })
      .exec();

    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

exports.get_single_blog = asyncHandler(async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.query.id).populate("admin").exec();
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

exports.delete_blog = asyncHandler(async (req, res, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.body.id);
    return res.status(200).json({ msg: "Blog has been Deleted From DB." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

exports.edit_blog = [
  body("title", "Title must be of 3 characters atleast.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Description must be of 3 characters atleast.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const oldBlog = await Blog.findById(req.body.id).exec();

    if (!oldBlog) {
      return res.status(404).json({ msg: "Blog not found in DB!" });
    }

    if (!errors.isEmpty()) {
      res.status(500).json(errors.array());
    } else {
      try {
        const blog = new Blog({
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          picture: oldBlog.picture,
          admin: oldBlog.admin,
          date_posted: oldBlog.date_posted,
          comments: oldBlog.comments,
          _id: oldBlog._id,
        });

        const result = await Blog.findByIdAndUpdate(req.body.id, blog, {});
        return res.status(200).json({ msg: "Blog Updated successfully!" });
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    }
  }),
];
