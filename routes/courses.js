const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses');

// Routes for Courses
router.get('/courses', coursesController.getAllCourses);
router.get('/courses/:id', coursesController.getCourseById);
router.get('/courses/teacher/:id', coursesController.getCoursesByTeacherId);
router.get('/courses/student/:id', coursesController.getCoursesByStudent);
router.post('/courses', coursesController.createCourse);
router.put('/courses/:id', coursesController.updateCourse);
router.delete('/courses/:id', coursesController.deleteCourse);

module.exports = router;