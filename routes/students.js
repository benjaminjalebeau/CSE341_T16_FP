const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');

const {
	createRules,
	checkOnCreate,
	updateRules,
	checkOnUpdate,
	getByYearRules,
	checkOnGet,
	getByStatusRules
} = require('../utilities/students-validation');
const { idRules, checkOnId } = require('../utilities/id-validation');
const { isAuthenticated } = require('../utilities/authenticate');
const { handleErrors } = require('../utilities/errors');

// Get all students
router.get('/', handleErrors(studentsController.getAll));

// Get a single student by ID
router.get('/:id', idRules(), checkOnId, handleErrors(studentsController.getSingle));

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
	isAuthenticated,
	handleErrors(studentsController.createStudent)
);

// Update an existing student
router.put(
	'/:id',
	updateRules(),
	checkOnUpdate,
	isAuthenticated,
	handleErrors(studentsController.updateStudent)
);

// Delete a student
router.delete(
	'/:id',
	idRules(),
	checkOnId,
	isAuthenticated,
	handleErrors(studentsController.deleteStudent)
);

module.exports = router;
