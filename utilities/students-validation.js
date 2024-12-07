const { body, param, validationResult } = require('express-validator');
const { ValidationError, detailValidationErrors } = require('./errors');

function getByYearRules() {
	return [
		param('studentyear')
			.trim()
			.escape()
			.notEmpty()
			.isInt({ min: 1, max: 5 })
			.withMessage('Please enter a valid student year.')
	];
}

function getByStatusRules() {
	return [
		param('enrollmentstatus')
			.trim()
			.escape()
			.notEmpty()
			.isBoolean()
			.withMessage('Please enter a valid enrollment status.')
	];
}

function checkOnGet(req, res, next) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const details = detailValidationErrors(errors.array());

		return res
			.status(400)
			.setHeader('Content-Type', 'application/json')
			.json(new ValidationError(400, 'Error on retrieve students.', details));
	}

	next();
}

function createRules() {
	return [
		body('firstname')
			.trim()
			.escape()
			.notEmpty()
			.isLength({ min: 3 })
			.withMessage('Please enter a valid first name.'),

		body('lastname')
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
			.withMessage('Password does not meet requirements.'),

		body('studentyear')
			.trim()
			.escape()
			.notEmpty()
			.isInt({ min: 1, max: 5 })
			.withMessage('Please enter a valid student year.'),

		body('enrollmentstatus')
			.trim()
			.escape()
			.notEmpty()
			.isBoolean()
			.withMessage('Please enter a valid enrollment status.')
	];
}

function checkOnCreate(req, res, next) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const details = detailValidationErrors(errors.array());

		return res
			.status(422)
			.setHeader('Content-Type', 'application/json')
			.json(new ValidationError(422, 'Error on student creation.', details));
	}

	next();
}

function updateRules() {
	return [
		param('id')
			.isLength({ min: 24, max: 24 })
			.matches(/^[a-fA-F0-9]+$/)
			.isMongoId()
			.withMessage('Please enter a valid student id.'),

		body('firstname')
			.trim()
			.escape()
			.notEmpty()
			.isLength({ min: 3 })
			.withMessage('Please enter a valid first name.'),

		body('lastname')
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
			.withMessage('Password does not meet requirements.'),

		body('studentyear')
			.trim()
			.escape()
			.notEmpty()
			.isInt({ min: 1, max: 5 })
			.withMessage('Please enter a valid student year.'),

		body('enrollmentstatus')
			.trim()
			.escape()
			.notEmpty()
			.isBoolean()
			.withMessage('Please enter a valid enrollment status.')
	];
}

function checkOnUpdate(req, res, next) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const details = detailValidationErrors(errors.array());

		return res
			.status(400)
			.setHeader('Content-Type', 'application/json')
			.json(
				new ValidationError(400, 'Error on student modification.', details)
			);
	}

	next();
}

module.exports = {
	createRules,
	updateRules,
	checkOnCreate,
	checkOnUpdate,
	getByYearRules,
	getByStatusRules,
	checkOnGet
};
