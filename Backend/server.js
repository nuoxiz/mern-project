const express = require("express");
const dotenv = require("dotenv").config(); //allow us to have a .env file with variables in it.
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express(); // initialising express

// Add middle-ware so that we can use req.body in goalController.js
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes")); // when the user hit the /api/goals, it will look into the goalRoutes file. Therefore, only need to specify the path as "/" in router.get()

app.use(errorHandler); // override the default Express error handler

app.listen(port, () => console.log(`Server started on port ${port}`));
