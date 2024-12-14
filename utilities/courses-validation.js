const { body, param, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const { ValidationError, detailValidationErrors } = require('../utilities/errors');

function createRules() {
	return [
		body('studentsEnrolled')
			.isArray()
			.withMessage('studentsEnrolled must be an array.')
			.custom((array) => array.every((item) => /^[a-fA-F0-9]{24}$/.test(item)))
			.withMessage('Each studentID must be a valid MongoDB Id.'),

		body('teacherId')
			.matches(/^[a-fA-F0-9]{24}$/)
			.withMessage('Please enter a valid teacher ID (24-character hexadecimal).'),

		body('courseName')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('courseName is required.')
			.isString()
			.withMessage('courseName must be a string.')
			.matches(/^[A-Za-z ]+$/)
			.withMessage('Enter a valid course name containing only letters and spaces (e.g., "Operating Systems").'),

		body('credits')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('credits is required.')
			.isInt()
			.withMessage('credits must be an integer.'),

		body('assignmentId')
			.isArray()
			.withMessage('assignmentId must be an array.')
			.custom((array) => array.every((item) => /^[a-fA-F0-9]{24}$/.test(item)))
			.withMessage('Each assignmentId must be a valid MongoDB Id.')
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
			.matches(/^[a-fA-F0-9]{24}$/)
			.withMessage('Please enter a valid course ID (24-character hexadecimal).'),

		body('studentsEnrolled')
			.isArray()
			.withMessage('studentsEnrolled must be an array.')
			.custom((array) => array.every((item) => /^[a-fA-F0-9]{24}$/.test(item)))
			.withMessage('Each studentID must be a valid MongoDB Id.'),

		body('teacherId')
			.matches(/^[a-fA-F0-9]{24}$/)
			.withMessage('Please enter a valid teacher ID (24-character hexadecimal).'),

		body('courseName')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('courseName is required.')
			.isString()
			.withMessage('courseName must be a string.')
			.matches(/^[A-Za-z ]+$/)
			.withMessage('Enter a valid course name containing only letters and spaces (e.g., "Operating Systems").'),

		body('credits')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('credits is required.')
			.isInt()
			.withMessage('credits must be an integer.'),

		body('assignmentId')
			.isArray()
			.withMessage('assignmentId must be an array.')
			.custom((array) => array.every((item) => /^[a-fA-F0-9]{24}$/.test(item)))
			.withMessage('Each assignmentId must be a valid MongoDB Id.')
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