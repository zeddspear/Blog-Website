const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    description: { type: String, required: true },
    date_posted: { type: Date, default: Date.now },
    blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
  },
  { timestamps: true }
);

CommentSchema.virtual("url").get(function () {
  return `/comment/${this._id}`;
});

CommentSchema.virtual("time").get(function () {
  return DateTime.fromJSDate(this.date_posted).toLocaleString(
    DateTime.DATETIME_MED
  );
});

CommentSchema.virtual("formatted_date_posted").get(function () {
  return DateTime.fromJSDate(this.date_posted).toLocaleString(
    DateTime.DATE_MED
  );
});

CommentSchema.virtual("blog_delete_url").get(function () {
  return `comment/delete/${this._id}`;
});

module.exports = mongoose.model("Comment", CommentSchema);
