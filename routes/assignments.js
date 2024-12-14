const { Router } = require('express');

const {
	getAllAssignments,
	addAssignment,
	getAssignmentByID,
	updateAssignment,
	deleteAssignment
} = require('../controllers/assignments');
const {
	createRules,
	updateRules,
	checkOnCreate,
	checkOnUpdate
} = require('../utilities/assignments-validation');
const { idRules, checkOnId } = require('../utilities/id-validation');
const { isAuthenticated } = require('../utilities/authenticate');
const { handleErrors } = require('../utilities/errors');

const router = new Router();

router.get('/', handleErrors(getAllAssignments));
router.post('/', createRules(), checkOnCreate, isAuthenticated, handleErrors(addAssignment));

router.get('/:id', idRules(), checkOnId, handleErrors(getAssignmentByID));
router.put('/:id', updateRules(), checkOnUpdate, isAuthenticated, handleErrors(updateAssignment));
router.delete('/:id', idRules(), checkOnId, isAuthenticated, handleErrors(deleteAssignment));

module.exports = router;
