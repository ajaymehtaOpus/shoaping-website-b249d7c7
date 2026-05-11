const { body, validationResult } = require('express-validator');

// Validation rules for user authentication
const registerValidator = [
  body('email')
    .isEmail().withMessage('Please enter a valid email address.')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
    .matches(/[0-9]/).withMessage('Password must contain a number.')
    .matches(/[a-zA-Z]/).withMessage('Password must contain a letter.')
    .trim(),
  body('username')
    .notEmpty().withMessage('Username is required.')
    .trim()
];

const loginValidator = [
  body('email')
    .isEmail().withMessage('Please enter a valid email address.')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required.')
];

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  registerValidator,
  loginValidator,
  validate
};