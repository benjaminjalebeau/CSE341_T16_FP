const router = require('express').Router();
const teachersController = require('../controllers/teachers');

const { isAuthenticated } = require('../utilities/authenticate');
const { handleErrors } = require('../utilities/errors');
const { idRules, checkOnId } = require('../utilities/id-validation');
const {
	createRules,
	updateRules,
	checkOnCreate,
	checkOnUpdate
} = require('../utilities/teachers-validation');

//Teacher CRUD routes
router.get('/', handleErrors(teachersController.getAllTeachers));

router.get(
	'/:id',
	idRules(),
	checkOnId,
	handleErrors(teachersController.getTeacherByID)
);

router.post(
	'/',
	createRules(),
	checkOnCreate,
	isAuthenticated,
	handleErrors(teachersController.addTeacher)
);

router.put(
	'/:id',
	updateRules(),
	checkOnUpdate,
	isAuthenticated,
	handleErrors(teachersController.updateTeacher)
);

router.delete(
	'/:id',
	idRules(),
	checkOnId,
	isAuthenticated,
	handleErrors(teachersController.deleteTeacher)
);

module.exports = router;
