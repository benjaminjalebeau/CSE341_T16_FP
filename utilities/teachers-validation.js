const { body, param, validationResult } = require('express-validator');
const {
	ValidationError,
	detailValidationErrors
} = require('../utilities/errors');

function createRules() {
	return [
		body('firstName')
			.trim()
			.escape()
			.notEmpty()
			.isLength({ min: 3 })
			.withMessage('Please enter a valid first name.'),

		body('lastName')
			.trim()
			.escape()
			.notEmpty()
			.isLength({ min: 3 })
			.withMessage('Please enter a valid last name.'),

		body('email')
			.trim()
			.escape()
			.notEmpty()
			.isEmail()
			.normalizeEmail()
			.withMessage('Please enter a valid email.'),

		body('password')
			.trim()
			.notEmpty()
			.isStrongPassword({
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1
			})
			.withMessage('Password does not meet requirements.')
	];
}

function checkOnCreate(req, res, next) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const details = detailValidationErrors(errors.array());

		return res
			.status(422)
			.setHeader('Content-Type', 'application/json')
			.json(new ValidationError(422, 'Error on teacher creation.', details));
	}

	next();
}

function updateRules() {
	return [
		param('id')
			.isLength({ min: 24, max: 24 })
			.matches(/^[a-fA-F0-9]+$/)
			.isMongoId()
			.withMessage('Please enter a valid teacher id.'),

		body('firstName')
			.trim()
			.escape()
			.notEmpty()
			.isLength({ min: 3 })
			.withMessage('Please enter a valid first name.'),

		body('lastName')
			.trim()
			.escape()
			.notEmpty()
			.isLength({ min: 3 })
			.withMessage('Please enter a valid last name.'),

		body('email')
			.trim()
			.escape()
			.notEmpty()
			.isEmail()
			.normalizeEmail()
			.withMessage('Please enter a valid email.'),

		body('password')
			.trim()
			.notEmpty()
			.isStrongPassword({
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1
			})
			.withMessage('Password does not meet requirements.')
	];
}

function checkOnUpdate(req, res, next) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const details = detailValidationErrors(errors.array());

		return res
			.status(400)
			.setHeader('Content-Type', 'application/json')
			.json(new ValidationError(400, 'Error on user modification.', details));
	}

	next();
}

module.exports = { createRules, updateRules, checkOnCreate, checkOnUpdate };
