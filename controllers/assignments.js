const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');
const { AppError } = require('../utilities/errors');

// Gets all assignments stored in the assignments collection
const getAllAssignments = async (req, res) => {
	// #swagger.tags=['Assignments']
	try {
		const result = await mongodb.getDatabase().collection('assignments').find().toArray();

		if (result.length === 0) {
			throw new AppError(404, 'Assignments not found');
		}

		return res.status(200).setHeader('Content-Type', 'application/json').json(result);
	} catch (err) {
		throw new AppError(err.status || 500, err.message || 'Some went wrong finding assignments');
	}
};

// Gets a single assignment in the assignments collection by their MongoId
const getAssignmentByID = async (req, res) => {
	// #swagger.tags=['Assignments']
	try {
		const id = ObjectId.createFromHexString(req.params.id);

		const result = await mongodb
			.getDatabase()
			.collection('assignments')
			.find({ _id: id })
			.toArray();

		if (result.length === 0) {
			throw new AppError(404, 'Assignment not found');
		}

		return res.status(200).setHeader('Content-Type', 'application/json').json(result[0]);
	} catch (err) {
		throw new AppError(err.status || 500, err.message || 'Some went wrong finding assignment');
	}
};

// Adds an assignment to the assignments collection
const addAssignment = async (req, res) => {
	// #swagger.tags=['Assignments']
	try {
		const { body } = req;

		const response = await mongodb.getDatabase().collection('assignments').insertOne(body);

		if (!response.acknowledged) {
			throw new Error(response.error || 'Something happened while adding the assignment');
		}

		return res
			.status(201)
			.setHeader('Content-Type', 'application/json')
			.json({ assignmentID: response.insertedId });
	} catch (err) {
		throw new AppError(err.status || 500, err.message || 'Some went wrong creating assignment');
	}
};

// Updates an assignment in the assignments collection using a valid MongoId.
const updateAssignment = async (req, res) => {
	// #swagger.tags=['Assignments']
	try {
		const id = ObjectId.createFromHexString(req.params.id);

		const { body } = req;

		const response = await mongodb
			.getDatabase()
			.collection('assignments')
			.replaceOne({ _id: id }, body);

		if (response.modifiedCount <= 0) {
			throw new Error(response.error || 'Something happened while updating the assignment');
		}

		return res.status(204).setHeader('Content-Type', 'application/json');
	} catch (err) {
		throw new AppError(err.status || 500, err.message || 'Some went wrong updating the assignment');
	}
};

// Removes an assignment from the assignments collection using a valid MongoId.
const deleteAssignment = async (req, res) => {
	// #swagger.tags=['Assignments']
	try {
		const id = ObjectId.createFromHexString(req.params.id);

		const response = await mongodb.getDatabase().collection('assignments').deleteOne({ _id: id });

		if (response.deletedCount <= 0) {
			throw new Error(response.error || 'Something happened while deleting the assignment');
		}

		return res.status(204).setHeader('Content-Type', 'application/json');
	} catch (err) {
		throw new AppError(err.status || 500, err.message || 'Some went wrong deleting the assignment');
	}
};

module.exports = {
	getAllAssignments,
	getAssignmentByID,
	addAssignment,
	updateAssignment,
	deleteAssignment
};
