const { Router } = require('express');

const {
	getAllAssignments,
	addAssignment,
	getAssignmentByID,
	updateAssignment,
	deleteAssignment
} = require('../controllers/assignments');
const { idRules, checkOnId } = require('../utilities/id-validation');
const { isAuthenticated } = require('../utilities/authenticate');
const { handleErrors } = require('../utilities/errors');

const router = new Router();

router.get('/', handleErrors(getAllAssignments));
router.post('/', isAuthenticated, handleErrors(addAssignment));

router.get('/:assignmentId', idRules, checkOnId, handleErrors(getAssignmentByID));
router.put('/:assignmentId', isAuthenticated, handleErrors(updateAssignment));
router.delete(
	'/:assignmentId',
	idRules,
	checkOnId,
	isAuthenticated,
	handleErrors(deleteAssignment)
);

module.exports = router;
