// When we use mongoose to interact with the MongoDB, we'll get back a promise
const asyncHandler = require("express-async-handler");

// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "GET goals" }); // respond the client request with JSON
});

// @desc Get Goals
// @route GET /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field"); // Express error handler
  }
  res.status(200).json({ message: "CREATE goals" });
});

// @desc update Goals
// @route PUT /api/goals
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `UPDATE goals ${req.params.id}` });
});

// @desc DELETE Goals
// @route DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: ` DELETE goals ${req.params.id}` });
});

module.exports = { getGoal, setGoal, updateGoal, deleteGoal };
