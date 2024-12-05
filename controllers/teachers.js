const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');
const { AppError } = require('../utilities/errors');

// Gets all teachers stored in the teachers collection
const getAllTeachers = async (req, res) => {
	//#swagger.tags=['Teachers']
	try {
		const result = await mongodb
			.getDatabase()
			.collection('teachers')
			.find()
			.toArray();

		if (result.length === 0) {
			throw new AppError(404, 'Teachers not found');
		}

		return res
			.status(200)
			.setHeader('Content-Type', 'application/json')
			.json(result);
	} catch (err) {
		throw new AppError(
			err.status || 500,
			err.message || 'Some went wrong finding teachers'
		);
	}
};

//Gets a single teacher in the teachers collection by their MongoDBId
//Errors will return if parameter is not a valid mongodbid, the id matches no teachers in the collection,
//or the response/request was bad.
const getTeacherByID = async (req, res) => {
	//#swagger.tags=['Teachers']
	try {
		if (!ObjectId.isValid(req.params.id)) {
			throw new AppError(400, 'Please enter a valid teacher id.');
		}
		const teacherId = ObjectId.createFromHexString(req.params.id);
		const result = await mongodb
			.getDatabase()
			.collection('teachers')
			.find({ _id: teacherId })
			.toArray();

		if (result.length === 0) {
			throw new AppError(404, 'Teacher not found');
		}

		return res
			.status(200)
			.setHeader('Content-Type', 'application/json')
			.json(result[0]);
	} catch (err) {
		throw new AppError(
			err.status || 500,
			err.message || 'Some went wrong finding teacher'
		);
	}
};

//Adds a teacher to the teachers collection
const addTeacher = async (req, res) => {
	//#swagger.tags=['Teachers']
	try {
		const teacher = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password
		};

		const response = await mongodb
			.getDatabase()
			.collection('teachers')
			.insertOne(teacher);

		if (!response.acknowledged) {
			throw new Error(
				response.error || 'Something happened while adding the teacher'
			);
		}

		return res
			.status(201)
			.setHeader('Content-Type', 'application/json')
			.json({ teacherID: response.insertedId });
	} catch (err) {
		throw new AppError(
			err.status || 500,
			err.message || 'Some went wrong creating teacher'
		);
	}
};

//Updates a teacher in the teacher collection using a valid MongodbId.
//Errors will return if parameter is not a valid mongodbid, the id matches no teachers in the collection,
//or the response/request was bad.
const updateTeacher = async (req, res) => {
	//#swagger.tags=['Teachers']
	try {
		if (!ObjectId.isValid(req.params.id)) {
			throw new AppError(400, 'Please enter a valid teacher id.');
		}

		const teacherId = ObjectId.createFromHexString(req.params.id);
		const teacher = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password
		};

		const response = await mongodb
			.getDatabase()
			.collection('teachers')
			.replaceOne({ _id: teacherId }, teacher);

		if (response.modifiedCount <= 0) {
			throw new Error(
				response.error || 'Something happened while updating the teacher'
			);
		}

		return res.status(204).send();
	} catch (err) {
		throw new AppError(
			err.status || 500,
			err.message || 'Some went wrong updating teacher'
		);
	}
};

//Removes a teacher from the teachers collection using a valid mongodbid.
//Errors will return if parameter is not a valid mongodbid, the id matches no teachers in the collection,
//or the response/request was bad.
const deleteTeacher = async (req, res) => {
	//#swagger.tags=['Teacher']
	try {
		if (!ObjectId.isValid(req.params.id)) {
			res.status(400).json('Please enter a valid teacher id.');
		}

		const teacherId = ObjectId.createFromHexString(req.params.id);

		const response = await mongodb
			.getDatabase()
			.collection('teachers')
			.deleteOne({ _id: teacherId });

		if (response.deletedCount <= 0) {
			throw new Error(
				response.error || 'Something happened while deleting the teacher'
			);
		}

		return res.status(204).send();
	} catch (err) {
		throw new AppError(
			err.status || 500,
			err.message || 'Some went wrong deleting teacher'
		);
	}
};

module.exports = {
	getAllTeachers,
	getTeacherByID,
	addTeacher,
	updateTeacher,
	deleteTeacher
};
