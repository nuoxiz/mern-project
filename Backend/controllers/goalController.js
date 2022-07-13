// When we use mongoose to interact with the MongoDB, we'll get back a promise
const { ObjectID } = require("bson");
const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoal = asyncHandler(async (req, res) => {
  const goals = await Goal.find(); // get the goals from our data base and give it to the client
  res.status(200).json(goals); // respond the client request with JSON
});

// @desc Get Goals
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field"); // Express error handler
  }

  const goal = await Goal.create({
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
  //   const message = await Goal.findByIdAndDelete(req.params.id);
  goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoal, setGoal, updateGoal, deleteGoal };
