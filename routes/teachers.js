const router = require('express').Router();
const teachersController = require('../controllers/teachers');

const { isAuthenticated } = require('../utilities/authenticate');
const { handleErrors } = require('../utilities/errors');

//Teacher CRUD routes
router.get('/', handleErrors(teachersController.getAllTeachers));

router.get('/:id', handleErrors(teachersController.getTeacherByID));

router.post('/', isAuthenticated, handleErrors(teachersController.addTeacher));

router.put(
	'/:id',
	isAuthenticated,
	handleErrors(teachersController.updateTeacher)
);

router.delete(
	'/:id',
	isAuthenticated,
	handleErrors(teachersController.deleteTeacher)
);

module.exports = router;
