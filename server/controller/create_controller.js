const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

exports.post_blog = [
  body("title", "Title must be of 3 characters atleast.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Description must be of 3 characters atleast.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("picture", "Blog picture must not be empty.").notEmpty(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json(errors.array());
    } else {
      try {
        const blog = new Blog({
          title: req.body.title,
          description: req.body.description,
          picture: req.body.picture,
          date_posted: req.body.date_posted,
          comments: req.body.comments,
          admin: req.body.admin,
          category: req.body.category,
        });

        const result = await blog.save();
        return res.status(200).json({ msg: "Blog Posted successfully!" });
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    }
  }),
];

exports.post_comment = asyncHandler(async (req, res, next) => {
  const mainBlog = await Blog.findById(req.body.blog).exec();

  try {
    const newComment = new Comment({
      description: req.body.description,
      date_posted: req.body.date_posted,
      blog: req.body.blog,
    });

    let newCommentsArray = mainBlog.comments;

    newCommentsArray.push(newComment);

    console.log(newCommentsArray);

    const updatedBlog = new Blog({
      title: mainBlog.title,
      description: mainBlog.description,
      picture: mainBlog.picture,
      date_posted: mainBlog.date_posted,
      comments: newCommentsArray,
      admin: mainBlog.admin,
      category: mainBlog.category,
      _id: mainBlog._id,
    });

    await newComment.save();

    await Blog.findByIdAndUpdate(req.body.blog, updatedBlog, {});

    return res.status(200).json({ msg: "Comment Posted" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
