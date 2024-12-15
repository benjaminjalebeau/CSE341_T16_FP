const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');
const { AppError } = require('../utilities/errors');

const getAllCourses = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        const result = await mongodb
            .getDatabase()
            .collection('courses')
            .find()
            .toArray();

        if (result.length === 0) throw new AppError(404, 'No courses found');

        return res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(result);
    } catch (err) {
        console.error('An error occurred while retrieving courses');
        throw new AppError(err.status || 500, err.message);
    }
};

const getCourseById = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        const courseId = ObjectId.createFromHexString(req.params.id);

        const result = await mongodb
            .getDatabase()
            .collection('courses')
            .find({ _id: courseId })
            .toArray();

        if (result.length === 0) throw new AppError(404, 'Course not found');

        return res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(result[0]);
    } catch (err) {
        console.error('An error occurred while retrieving the course');
        throw new AppError(err.status || 500, err.message);
    }
};

const getCoursesByTeacherId = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        const teacherId = req.params.id;

        const result = await mongodb
            .getDatabase()
            .collection('courses')
            .find({ teacherId: teacherId })
            .toArray();

        if (result.length === 0) throw new AppError(404, 'No courses found for the given teacher');

        return res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(result);
    } catch (err) {
        console.error('An error occurred while retrieving courses by teacher ID');
        throw new AppError(err.status || 500, err.message);
    }
};

const getCoursesByStudent = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        const studentId = req.params.id;

        const result = await mongodb
            .getDatabase()
            .collection('courses')
            .find({ studentsEnrolled: studentId })
            .toArray();

        if (result.length === 0) throw new AppError(404, 'No courses found for the given student');

        return res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(result);
    } catch (err) {
        console.error('An error occurred while retrieving courses by student');
        throw new AppError(err.status || 500, err.message);
    }
};

const createCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        const course = {
            studentsEnrolled: req.body.studentsEnrolled || [],
            teacherId: req.body.teacherId,
            courseName: req.body.courseName,
            credits: req.body.credits,
            assignmentId: req.body.assignmentId,
        };

        const response = await mongodb
            .getDatabase()
            .collection('courses')
            .insertOne(course);

        if (!response.acknowledged)
            throw new AppError(500, 'Some error occurred while creating the course');

        return res
            .status(201)
            .setHeader('Content-Type', 'application/json')
            .json({ courseId: response.insertedId });
    } catch (err) {
        console.error('An error occurred while creating the course');
        throw new AppError(err.status || 500, err.message);
    }
};

const updateCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        const courseId = ObjectId.createFromHexString(req.params.id);

        const updatedCourse = {
            studentsEnrolled: req.body.studentsEnrolled,
            teacherId: req.body.teacherId,
            courseName: req.body.courseName,
            credits: req.body.credits,
            assignmentId: req.body.assignmentId,
        };

        const response = await mongodb
            .getDatabase()
            .collection('courses')
            .updateOne({ _id: courseId }, { $set: updatedCourse });

        if (response.modifiedCount === 0)
            throw new AppError(404, 'Course not found or no changes made');

        return res.status(204).send();
    } catch (err) {
        console.error('An error occurred while updating the course');
        throw new AppError(err.status || 500, err.message);
    }
};

const deleteCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        const courseId = ObjectId.createFromHexString(req.params.id);

        const response = await mongodb
            .getDatabase()
            .collection('courses')
            .deleteOne({ _id: courseId });

        if (response.deletedCount === 0)
            throw new AppError(404, 'Course not found');

        return res.status(204).send();
    } catch (err) {
        console.error('An error occurred while deleting the course');
        throw new AppError(err.status || 500, err.message);
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    getCoursesByTeacherId,
    getCoursesByStudent,
    createCourse,
    updateCourse,
    deleteCourse,
};