const mongodb = require('../data/database');
const { AppError } = require('../utilities/errors');

const getAll = async (req, res) => {
	//#swagger.tags=['Students']
	try {
		const result = await mongodb
			.getDatabase()
			.collection('students')
			.find()
			.toArray();

		if (result.length === 0) throw new AppError(404, 'Students not found');

		return res
			.status(200)
			.setHeader('Content-Type', 'application/json')
			.json(result);
	} catch (err) {
		console.log('An error occurred while retrieving students');
		throw new AppError(err.status || 500, err.message);
	}
};

const getSingle = async (req, res) => {
	//#swagger.tags=['Students']
	try {
		const studentId = parseInt(req.params.id);
		const result = await mongodb
			.getDatabase()
			.collection('students')
			.find({ student_id: studentId })
			.toArray();

		if (result.length === 0) throw new AppError(404, 'Student not found');

		return res
			.status(200)
			.setHeader('Content-Type', 'application/json')
			.json(result[0]);
	} catch (err) {
		console.error('An error occurred while retrieving student');
		throw new AppError(err.status || 500, err.message);
	}
};

const getByStudentYear = async (req, res) => {
	//#swagger.tags=['Students']
	const studentYear = parseInt(req.params.studentyear);

	try {
		const result = await mongodb
			.getDatabase()
			.collection('students')
			.find({ studentyear: studentYear })
			.toArray();

		if (result.length === 0)
			throw new AppError(404, 'No students found for the given year.');

		return res
			.status(200)
			.setHeader('Content-Type', 'application/json')
			.json(result);
	} catch (err) {
		console.log('An error occurred while retrieving students by year');
		throw new AppError(err.status || 500, err.message);
	}
};

const getByEnrollmentStatus = async (req, res) => {
	//#swagger.tags=['Students']
	const { enrollmentstatus } = req.params;
	const enrollmentStatus = enrollmentstatus !== 'false';

	try {
		const result = await mongodb
			.getDatabase()
			.collection('students')
			.find({ enrollmentstatus: enrollmentStatus })
			.toArray();

		if (result.length === 0)
			throw new AppError(
				404,
				'No students found for the given enrollment status.'
			);

		return res
			.status(200)
			.setHeader('Content-Type', 'application/json')
			.json(result);
	} catch (err) {
		console.log(
			'An error occurred while retrieving students by enrollment status'
		);
		throw new AppError(err.status || 500, err.message);
	}
};

const createStudent = async (req, res) => {
	//#swagger.tags=['Students']
	try {
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

		if (!response.acknowledged)
			throw new Error(
				response.error || 'Some error occurred while creating the student.'
			);

		return res
			.status(201)
			.setHeader('Content-Type', 'application/json')
			.json({ studentID: response.insertedId });
	} catch (err) {
		throw new AppError(err.status || 500, err.message);
	}
};

const updateStudent = async (req, res) => {
	//#swagger.tags=['Students']
	const studentId = parseInt(req.params.id);

	try {
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

		if (response.modifiedCount <= 0)
			throw new Error(
				response.error || 'Some error occurred while updating the student.'
			);

		return res.status(204).send();
	} catch (err) {
		throw new AppError(err.status || 500, err.message);
	}
};

const deleteStudent = async (req, res) => {
	//#swagger.tags=['Students']
	const studentId = parseInt(req.params.id);

	try {
		const response = await mongodb
			.getDatabase()
			.collection('students')
			.deleteOne({ student_id: studentId });

		if (response.deletedCount <= 0)
			throw new Error(
				response.error || 'Some error occurred while deleting the student.'
			);

		return res.status(204).send();
	} catch (err) {
		throw new AppError(err.status || 500, err.message);
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
