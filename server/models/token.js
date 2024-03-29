const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
});

module.exports = mongoose.model("Token", tokenSchema);
