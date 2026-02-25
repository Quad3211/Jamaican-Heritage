const { validationResult } = require("express-validator");

/**
 * Middleware: run after express-validator chains.
 * Returns 422 with error details if validation failed.
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed.",
      errors: errors.array().map((e) => ({ field: e.path, msg: e.msg })),
    });
  }
  next();
}

module.exports = { handleValidationErrors };
