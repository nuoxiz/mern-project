// Middlewares are functions that execute during the request-respond cycle
// We pass in "err" to override the default Express error handler
// "next" = any other middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // give us stack-trace only when we are in development mode
  });
};

module.exports = { errorHandler };
