const mongodb = require('../data/database');
const { AppError } = require('../utilities/errors');

const getAll = async (req, res) => {
	//#swagger.tags=['Students']
	const result = await mongodb.getDatabase().collection('students').find();
	result
		.toArray()
		.then((students) => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(students);
		})
		.catch((err) => {
			console.log('An error occurred while retrieving students');
			throw new AppError(err.status || 500, err.message);
		});
};

const getSingle = async (req, res) => {
	//#swagger.tags=['Students']
	const studentId = parseInt(req.params.id);
	const result = await mongodb
		.getDatabase()
		.collection('students')
		.find({ student_id: studentId });

	result
		.toArray()
		.then((students) => {
			if (students.length === 0) {
				throw new AppError(404, 'Student not found');
			}
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(students[0]);
		})
		.catch((err) => {
			console.log('An error occurred while retrieving student');
			throw new AppError(err.status || 500, err.message);
		});
};

const getByStudentYear = async (req, res) => {
	//#swagger.tags=['Students']
	const studentYear = parseInt(req.params.studentyear);

	const result = await mongodb
		.getDatabase()
		.collection('students')
		.find({ studentyear: studentYear });
	result
		.toArray()
		.then((students) => {
			if (students.length === 0) {
				throw new AppError(404, 'No students found for the given year.');
			}
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(students);
		})
		.catch((err) => {
			console.log('An error occurred while retrieving students by year');
			throw new AppError(err.status || 500, err.message);
		});
};

const getByEnrollmentStatus = async (req, res) => {
	//#swagger.tags=['Students']
	const enrollmentStatus = req.params.enrollmentstatus;

	const result = await mongodb
		.getDatabase()
		.collection('students')
		.find({ enrollmentstatus: enrollmentStatus });
	result
		.toArray()
		.then((students) => {
			if (students.length === 0) {
				throw new AppError(
					404,
					'No students found for the given enrollment status.'
				);
			}
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(students);
		})
		.catch((err) => {
			console.log(
				'An error occurred while retrieving students by enrollment status'
			);
			throw new AppError(err.status || 500, err.message);
		});
};

const createStudent = async (req, res) => {
	//#swagger.tags=['Students']
	const lastStudent = await mongodb
		.getDatabase()
		.collection('students')
		.find()
		.sort({ student_id: -1 })
		.limit(1)
		.toArray();
	// Generate new student_id
	const newStudentId =
		lastStudent.length > 0 ? lastStudent[0].student_id + 1 : 1;

	const student = {
		student_id: newStudentId,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: req.body.password,
		studentyear: req.body.studentyear,
		enrollmentstatus: req.body.enrollmentstatus
	};

	const response = await mongodb
		.getDatabase()
		.collection('students')
		.insertOne(student);
	if (response.acknowledged) {
		res.status(204).send();
	} else {
		throw new AppError(
			err.status || 500,
			response.error || 'Some error occurred while creating the student.'
		);
	}
};

const updateStudent = async (req, res) => {
	//#swagger.tags=['Students']
	const studentId = parseInt(req.params.id);
	const updatedStudent = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: req.body.password,
		studentyear: req.body.studentyear,
		enrollmentstatus: req.body.enrollmentstatus
	};

	const response = await mongodb
		.getDatabase()
		.collection('students')
		.updateOne({ student_id: studentId }, { $set: updatedStudent });

	if (response.modifiedCount > 0) {
		res.status(204).send();
	} else {
		throw new AppError(
			err.status || 500,
			response.error || 'Some error occurred while updating the student.'
		);
	}
};

const deleteStudent = async (req, res) => {
	//#swagger.tags=['Students']
	const studentId = parseInt(req.params.id);
	const response = await mongodb
		.getDatabase()
		.collection('students')
		.deleteOne({ student_id: studentId });
	if (response.deletedCount > 0) {
		res.status(204).send();
	} else {
		throw new AppError(
			err.status || 500,
			response.error || 'Some error occurred while deleting the student.'
		);
	}
};

module.exports = {
	getAll,
	getSingle,
	createStudent,
	updateStudent,
	getByStudentYear,
	getByEnrollmentStatus,
	deleteStudent
};
