const { body, param, validationResult } = require('express-validator');
const { ValidationError, detailValidationErrors } = require('./errors');

function createRules() {
	return [
		body('title')
			.trim()
			.escape()
			.isString()
			.withMessage('title must be a string')
			.notEmpty()
			.withMessage('title should not be void'),

		body('description')
			.trim()
			.escape()
			.isString()
			.withMessage('description must be a string')
			.notEmpty()
			.withMessage('description should not be void'),

		body('dueDate')
			.trim()
			.escape()
			.notEmpty()
			.isDate()
			.isISO8601()
			.withMessage('dueDate must be a valid date in ISO 8601 format'),

		body('file')
			.trim()
			.isString()
			.withMessage('file must be a string')
			.isURL()
			.withMessage('file should be a valid path'),

		body('rubric')
			.isArray()
			.withMessage('rubric must be an array.')
			.custom((array) => array.every((item) => typeof item === 'string'))
			.withMessage('Each item must be string')
	];
}

function checkOnCreate(req, res, next) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const details = detailValidationErrors(errors.array());

		return res
			.status(422)
			.setHeader('Content-Type', 'application/json')
			.json(new ValidationError(422, 'Error on assignment creation.', details));
	}

	next();
}

function updateRules() {
	return [
		param('id')
			.isLength({ min: 24, max: 24 })
			.matches(/^[a-fA-F0-9]+$/)
			.isMongoId()
			.withMessage('Please enter a valid assignment id.'),

		body('title')
			.trim()
			.escape()
			.isString()
			.withMessage('title must be a string')
			.notEmpty()
			.withMessage('title should not be void'),

		body('description')
			.trim()
			.escape()
			.isString()
			.withMessage('description must be a string')
			.notEmpty()
			.withMessage('description should not be void'),

		body('dueDate')
			.trim()
			.escape()
			.notEmpty()
			.isDate()
			.isISO8601()
			.withMessage('dueDate must be a valid date in ISO 8601 format'),

		body('file')
			.trim()
			.isString()
			.withMessage('file must be a string')
			.isURL()
			.withMessage('file should be a valid path'),

		body('rubric')
			.isArray()
			.withMessage('rubric must be an array.')
			.custom((array) => array.every((item) => typeof item === 'string'))
			.withMessage('Each item must be string')
	];
}

function checkOnUpdate(req, res, next) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const details = detailValidationErrors(errors.array());

		return res
			.status(400)
			.setHeader('Content-Type', 'application/json')
			.json(new ValidationError(400, 'Error on assignment modification.', details));
	}

	next();
}

module.exports = { createRules, updateRules, checkOnCreate, checkOnUpdate };
