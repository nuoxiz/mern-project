const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
// @desc
// @route
// @access

// @desc Regsiter new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //Check is user exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    // 201 = OK and something is created
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Check for user email
  const user = await User.findOne({ email });
  // we are checking whether the password and email provided by the user from the frontend matches with the
  // email and password from the DB
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  // should have access because we have set req.user in the middleware
  // const { _id, name, email } = await User.findById(req.user.id);

  // we already got the user inside protect() in authMiddleware.js which is called in the routes folder
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (userId) => {
  // This will sign a new token with the id passed
  //in with the SECRET specified, and this token will expire in 30 days
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  getMe,
  loginUser,
};
