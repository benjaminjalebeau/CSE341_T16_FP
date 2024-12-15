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
router.get('/', handleErrors(coursesController.getAllCourses)); // GET /courses
router.get('/:id', idRules(), checkOnId, handleErrors(coursesController.getCourseById)); // GET /courses/:id
router.get(
	'/teacher/:id',
	idRules(),
	checkOnId,
	handleErrors(coursesController.getCoursesByTeacherId)
); // GET /courses/teacher/:id
router.get(
	'/student/:id',
	idRules(),
	checkOnId,
	handleErrors(coursesController.getCoursesByStudent)
); // GET /courses/student/:id
router.post(
	'/',
	createRules(),
	checkOnCreate,
	isAuthenticated,
	handleErrors(coursesController.createCourse)
); // POST /courses
router.put(
	'/:id',
	updateRules(),
	checkOnUpdate,
	isAuthenticated,
	handleErrors(coursesController.updateCourse)
); // PUT /courses/:id
router.delete(
	'/:id',
	idRules(),
	checkOnId,
	isAuthenticated,
	handleErrors(coursesController.deleteCourse)
); // DELETE /courses/:id

module.exports = router;
