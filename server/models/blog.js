const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    picture: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
    date_posted: { type: Date },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

BlogSchema.virtual("blogurl").get(function () {
  return `/blog/${this._id}`;
});

// For Admin
BlogSchema.virtual("blog_url").get(function () {
  return `admin/blog/${this._id}`;
});

BlogSchema.virtual("time").get(function () {
  return DateTime.fromJSDate(this.date_posted).toLocaleString(
    DateTime.DATETIME_MED
  );
});

BlogSchema.virtual("formatted_date_posted").get(function () {
  return DateTime.fromJSDate(this.date_posted).toLocaleString(
    DateTime.DATE_MED
  );
});

//For Admin
BlogSchema.virtual("blog_delete_url").get(function () {
  return `admin/blog/delete/${this._id}`;
});

module.exports = mongoose.model("Blog", BlogSchema);
