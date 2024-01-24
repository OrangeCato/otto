const { body, validationResult } = require('express-validator');

exports.validateRegisterInput = [
    // Validate and sanitize the name
    body('name').trim().notEmpty().withMessage('Name is required.')
        .escape(),

    // Validate and sanitize the email
    body('email').isEmail().withMessage('Invalid email format.')
        .trim().normalizeEmail(),

    // Validate and sanitize the password
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
        .trim().escape(),

    // Check the validation result and return any errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];