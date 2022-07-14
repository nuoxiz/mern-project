//When we send an request to an end point/a route, the function below will run and check the token
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { Error } = require("mongoose");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  //In the HTTP header, we have an authorisation object, and we want to check that
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header : token[0] ="Bearer", token[1] = "<whatever the token is>"
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token because the token has the user id in the payload
      // decoded.id = whatever we passed in as id in jwt.sign() in userController.js
      // we assign it to req.user so that any route that is protected can access it
      // NB: find the user by the id that is in the token
      req.user = await User.findById(decoded.userId).select("-password"); // excluding the hashed password
      // console.log(req.user._id);
      next();
    } catch (error) {
      console.log(error);
      res.status(401); // 401 means not authorized
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401); // 401 means not authorized
    throw new Error("Not Authorized, no token");
  }
});

module.exports = { protect };

// when the token is sent in the authorisation header it's formatted as: Bearer <whatever the token is>
