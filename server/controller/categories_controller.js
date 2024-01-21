const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Category = require("../models/category");

exports.get_categories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).exec();
  return res.status(200).json(categories);
});

exports.post_category = [
  body("name", "name must be of 3 characters atleast.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(500).json(errors.array());
    } else {
      try {
        const category = new Category({
          name: req.body.name,
        });

        const result = await category.save();

        return res.status(200).json({ msg: "Category Successfully added!" });
      } catch (err) {
        return res.status(500).json({ msg: "Error while adding category" });
      }
    }
  }),
];
