// The model folder is where we define any resources we have in our application eg blog post to do
// goalModel.js is where we define our schema which is going to be the fields for this particular resource
// Everytime we create a model.js file, we will add a model automatically to the DB
const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    //the user field allow us to associate a
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // we need to specify which model does the ObjectId is from
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
); // or text: { type: String }

module.exports = mongoose.model("Goal", goalSchema);
