const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');

const { handleErrors } = require('../utilities/errors');

// Get all students
router.get('/', handleErrors(studentsController.getAll));

// Get a single student by ID
router.get('/:id', handleErrors(studentsController.getSingle));

// Get students by student year
router.get(
	'/year/:studentyear',
	handleErrors(studentsController.getByStudentYear)
);

// Get students by enrollment status
router.get(
	'/status/:enrollmentstatus',
	handleErrors(studentsController.getByEnrollmentStatus)
);

// Create a new student
router.post('/', handleErrors(studentsController.createStudent));

// Update an existing student
router.put('/:id', handleErrors(studentsController.updateStudent));

// Delete a student
router.delete('/:id', handleErrors(studentsController.deleteStudent));

module.exports = router;
