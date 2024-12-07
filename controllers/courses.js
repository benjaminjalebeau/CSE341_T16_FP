const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllCourses = async (req, res) => {
	//#swagger.tags=['Courses']
	try {
		const result = await mongodb
			.getDatabase()
			.collection('courses')
			.find()
			.toArray();

		// If no courses are found, return a 404 error message
		if (!result || result.length === 0) {
			return res.status(404).json('No courses found');
		}

		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(result);
	} catch (err) {
		// If an error occurs during the database query, return a 400 error
		res
			.status(400)
			.json({ message: 'Error retrieving courses', error: err.message });
	}
};

const getCourseById = async (req, res) => {
	//#swagger.tags=['Courses']
	try {
		const courseId = new ObjectId(req.params.MongoDBId); // Convert to ObjectId
		const result = await mongodb
			.getDatabase()
			.collection('courses')
			.find({ _id: courseId })
			.toArray();

		// Check if course is found
		if (!result || result.length === 0) {
			return res.status(404).json('Course not found');
		}

		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(result[0]);
	} catch (err) {
		// Handle database query or connection errors
		res
			.status(400)
			.json({ message: 'Error retrieving course', error: err.message });
	}
};

const getCoursesByTeacherId = async (req, res) => {
	//#swagger.tags=['Courses']
	try {
		const teacherId = req.params.teacherId;
		const result = await mongodb
			.getDatabase()
			.collection('courses')
			.find({ teacherId: teacherId })
			.toArray();

		if (!result || result.length === 0) {
			return res.status(404).json('No courses found for the given teacher');
		}

		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(result);
	} catch (err) {
		res
			.status(400)
			.json({
				message: 'Error retrieving courses by teacher ID',
				error: err.message
			});
	}
};

const getCoursesByStudent = async (req, res) => {
	//#swagger.tags=['Courses']
	try {
		const studentId = req.params.studentId;
		const result = await mongodb
			.getDatabase()
			.collection('courses')
			.find({ studentsEnrolled: studentId })
			.toArray();

		if (!result || result.length === 0) {
			return res.status(404).json('No courses found for the given student');
		}

		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(result);
	} catch (err) {
		res
			.status(400)
			.json({
				message: 'Error retrieving courses for student',
				error: err.message
			});
	}
};

const createCourse = async (req, res) => {
	//#swagger.tags=['Courses']
	const course = {
		studentsEnrolled: req.body.studentsEnrolled || [],
		teacherId: req.body.teacherId,
		courseName: req.body.courseName,
		credits: req.body.credits,
		assignmentId: req.body.assignmentId
	};

	try {
		const response = await mongodb
			.getDatabase()
			.collection('courses')
			.insertOne(course);
		if (response.acknowledged) {
			res
				.status(201)
				.json({
					message: 'Course created successfully',
					courseId: response.insertedId
				});
		} else {
			res
				.status(500)
				.json({ error: 'Some error occurred while creating the course' });
		}
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Error creating course', error: err.message });
	}
};

const updateCourse = async (req, res) => {
	//#swagger.tags=['Courses']
	const courseId = new ObjectId(req.params.MongoDBId);
	const updatedCourse = {
		studentsEnrolled: req.body.studentsEnrolled,
		teacherId: req.body.teacherId,
		courseName: req.body.courseName,
		credits: req.body.credits,
		assignmentId: req.body.assignmentId
	};

	try {
		const response = await mongodb
			.getDatabase()
			.collection('courses')
			.updateOne({ _id: courseId }, { $set: updatedCourse });
		if (response.modifiedCount > 0) {
			res.status(204).send(); // No content
		} else {
			res.status(404).json({ error: 'Course not found or no changes made' });
		}
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Error updating course', error: err.message });
	}
};

const deleteCourse = async (req, res) => {
	//#swagger.tags=['Courses']
	const courseId = req.params.MongoDBId;

	// Validate if the provided ID is a valid ObjectId
	if (!ObjectId.isValid(courseId)) {
		return res.status(400).json({ error: 'Invalid course ID format' });
	}

	try {
		const response = await mongodb
			.getDatabase()
			.collection('courses')
			.deleteOne({ _id: new ObjectId(courseId) });
		if (response.deletedCount > 0) {
			res.status(204).send(); // No Content
		} else {
			res.status(404).json({ error: 'Course not found' }); // Course not found
		}
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Error deleting course', error: err.message });
	}
};

module.exports = {
	getAllCourses,
	getCourseById,
	getCoursesByTeacherId,
	getCoursesByStudent,
	createCourse,
	updateCourse,
	deleteCourse
};
