const { body, param, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const { ValidationError, detailValidationErrors } = require('../utilities/errors');

function createRules() {
	return [
		body('studentsEnrolled')
			.isArray()
			.withMessage('studentsEnrolled must be an array')
			.custom((array) => array.every((item) => typeof item === 'string'))
			.withMessage('Each studentID must be a string')
			.custom((array) => array.every((item) => /^S\d{3}$/.test(item)))
			.withMessage('Each studentID must match "SXXX" format, where XXX are numbers'),

		body('teacherId')
			.isLength({ min: 24, max: 24 })
			.matches(/^[a-fA-F0-9]+$/)
			.isMongoId()
			.withMessage('Please enter a valid teacher id.'),

		body('courseName')
			.trim()
			.escape()
			.notEmpty()
			.isString()
			.withMessage('courseName must be a string')
			.matches(/^[A-Za-Z]+ \d{3}$/)
			.withMessage('Enter a valid course name.'),

		body('credits').trim().escape().notEmpty().isInt().withMessage('credits must be an int'),

		body('assignmentId')
			.isArray()
			.withMessage('assignmentId must be an array')
			.custom((array) => array.every((item) => ObjectId.isValid(item)))
			.withMessage('Each assignmentId must be a valid MongoId')
	];
}

function checkOnCreate(req, res, next) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const details = detailValidationErrors(errors.array());

		return res
			.status(422)
			.setHeader('Content-Type', 'application/json')
			.json(new ValidationError(422, 'Error on course creation.', details));
	}

	next();
}

function updateRules() {
	return [
		param('id')
			.isLength({ min: 24, max: 24 })
			.matches(/^[a-fA-F0-9]+$/)
			.isMongoId()
			.withMessage('Please enter a valid course id.'),

		body('studentsEnrolled')
			.isArray()
			.withMessage('studentsEnrolled must be an array')
			.custom((array) => array.every((item) => typeof item === 'string'))
			.withMessage('Each studentID must be a string')
			.custom((array) => array.every((item) => /^S\d{3}$/.test(item)))
			.withMessage('Each studentID must match "SXXX" format, where XXX are numbers'),

		body('teacherId')
			.isLength({ min: 24, max: 24 })
			.matches(/^[a-fA-F0-9]+$/)
			.isMongoId()
			.withMessage('Please enter a valid teacher id.'),

		body('courseName')
			.trim()
			.escape()
			.notEmpty()
			.isString()
			.withMessage('courseName must be a string')
			.matches(/^[A-Za-Z]+ \d{3}$/)
			.withMessage('Enter a valid course name.'),

		body('credits').trim().escape().notEmpty().isInt().withMessage('credits must be an int'),

		body('assignmentId')
			.isArray()
			.withMessage('assignmentId must be an array')
			.custom((array) => array.every((item) => ObjectId.isValid(item)))
			.withMessage('Each assignmentId must be a valid MongoId')
	];
}

function checkOnUpdate(req, res, next) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const details = detailValidationErrors(errors.array());

		return res
			.status(400)
			.setHeader('Content-Type', 'application/json')
			.json(new ValidationError(400, 'Error on course modification.', details));
	}

	next();
}

module.exports = { createRules, updateRules, checkOnCreate, checkOnUpdate };
