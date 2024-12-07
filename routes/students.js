const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');

const { idRules, checkOnId } = require('../utilities/id-validation');
const {
	createRules,
	checkOnCreate,
	updateRules,
	checkOnUpdate,
	getByYearRules,
	checkOnGet,
	getByStatusRules
} = require('../utilities/students-validation');
const { handleErrors } = require('../utilities/errors');

// Get all students
router.get('/', handleErrors(studentsController.getAll));

// Get a single student by ID
router.get(
	'/:id',
	idRules(),
	checkOnId,
	handleErrors(studentsController.getSingle)
);

// Get students by student year
router.get(
	'/year/:studentyear',
	getByYearRules(),
	checkOnGet,
	handleErrors(studentsController.getByStudentYear)
);

// Get students by enrollment status
router.get(
	'/status/:enrollmentstatus',
	getByStatusRules(),
	checkOnGet,
	handleErrors(studentsController.getByEnrollmentStatus)
);

// Create a new student
router.post(
	'/',
	createRules(),
	checkOnCreate,
	handleErrors(studentsController.createStudent)
);

// Update an existing student
router.put(
	'/:id',
	updateRules(),
	checkOnUpdate,
	handleErrors(studentsController.updateStudent)
);

// Delete a student
router.delete(
	'/:id',
	idRules(),
	checkOnId,
	handleErrors(studentsController.deleteStudent)
);

module.exports = router;
