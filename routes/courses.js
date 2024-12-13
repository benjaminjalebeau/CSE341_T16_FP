const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses');

const {
	createRules,
	updateRules,
	checkOnCreate,
	checkOnUpdate
} = require('../utilities/courses-validation');
const { idRules, checkOnId } = require('../utilities/id-validation');
const { isAuthenticated } = require('../utilities/authenticate');
const { handleErrors } = require('../utilities/errors');

// Routes for Courses
router.get('/courses', handleErrors(coursesController.getAllCourses));
router.get('/courses/:id', idRules, checkOnId, handleErrors(coursesController.getCourseById));
router.get(
	'/courses/teacher/:id',
	idRules,
	checkOnId,
	handleErrors(coursesController.getCoursesByTeacherId)
);
router.get('/courses/student/:id', handleErrors(coursesController.getCoursesByStudent));
router.post(
	'/courses',
	createRules,
	checkOnCreate,
	isAuthenticated,
	handleErrors(coursesController.createCourse)
);
router.put(
	'/courses/:id',
	updateRules,
	checkOnUpdate,
	isAuthenticated,
	handleErrors(coursesController.updateCourse)
);
router.delete(
	'/courses/:id',
	idRules,
	checkOnId,
	isAuthenticated,
	handleErrors(coursesController.deleteCourse)
);

module.exports = router;
