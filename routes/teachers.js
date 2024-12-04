const router = require('express').Router();
const teachersController = require("../controllers/teachers");

const { isAuthenticated } = require("../utilities/authenticate.js")


//Teacher CRUD routes
router.get('/', teachersController.getAllTeachers );

router.get('/:id', teachersController.getTeacherByID );

router.post('/', isAuthenticated, teachersController.addTeacher );

router.put('/:id', teachersController.updateTeacher );

router.delete('/:id', teachersController.deleteTeacher );




module.exports = router;