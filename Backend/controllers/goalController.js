// When we use mongoose to interact with the MongoDB, we'll get back a promise
const { ObjectID } = require("bson");
const asyncHandler = require("express-async-handler");
const { off } = require("../models/goalModel");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");
// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoal = asyncHandler(async (req, res) => {
  // get the goal where the user.id from the jwt token matches the "user" field in the Goal document and give it to the client
  const goal = await Goal.find({ user: req.user.id });
  // respond the client request with JSON
  res.status(200).json(goal);
});

// @desc Get Goals
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field"); // Express error handler
  }
  /////// create a new object and add it to the collection named associated with the specified model ///////////
  const goal = await Goal.create({
    user: req.user.id,
    text: req.body.text,
  });
  res.status(200).json(goal);
});

// @desc update Goals
// @route PUT /api/goals
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const user = await User.findById(req.user.id);
  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Comparing the user field (which is an ObjectId) in the goal we got with the user id what is in the JWT (req.user.id) this is done to ensure that a user can only delete goals that are associating with it
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); // new = an QueryOptions object, the code will create one if it does not exist.
  // req.body is the new verison of the content
  res.status(200).json({ message: `UPDATE goals ${updatedGoal}` });
});

// @desc DELETE Goals
// @route DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    throw new Error("Goal not found"); // Express.js have a default error handler which return a HTML page by default. We created errorMiddleware.js to override the default error handler and return the error message in the format we specified
  }
  const user = await User.findById(req.user.id);
  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Comparing the user field (which is an ObjectId) in the goal we got with the user id what is in the JWT (req.user.id) this is done to ensure that a user can only delete goals that are associating with it
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  //   const message = await Goal.findByIdAndDelete(req.params.id);
  goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoal, setGoal, updateGoal, deleteGoal };
