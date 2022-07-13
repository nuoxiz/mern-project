// The model folder is where we define any resources we have in our application eg blog post to do
// goalModel.js is where we define our schema which is going to be the fields for this particular resource

const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    text: { type: String, required: [true, "Please add a text value"] },
  },
  {
    timestamps: true,
  }
); // or text: { type: String }

module.exports = mongoose.model("Goal", goalSchema);
