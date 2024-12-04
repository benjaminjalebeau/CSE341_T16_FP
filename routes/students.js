const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');

// Get all students
router.get('/', studentsController.getAll);

// Get a single student by ID
router.get('/:id', studentsController.getSingle);

// Get students by student year
router.get('/:studentyear', studentsController.getByStudentYear);

// Get students by enrollment status
router.get('/:enrollmentstatus', studentsController.getByEnrollmentStatus);

// Create a new student
router.post('/', studentsController.createStudent);

// Update an existing student
router.put('/:id', studentsController.updateStudent);

// Delete a student
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;