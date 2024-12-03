const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Gets all teachers stored in the teachers collection
const getAllTeachers= async (req, res) => {
    //#swagger.tags=['Teachers']
    const result = await mongodb.getDatabase().db('students').collection('teachers').find();
    result.toArray((err) => {
        if (err) {
            res.status(400).json({message: err});
        }
    }).then((teachers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(teachers);
    });
};

//Gets a single teacher in the teachers collection by their MongoDBId
//Errors will return if parameter is not a valid mongodbid, the id matches no teachers in the collection, 
//or the response/request was bad. 
const getTeacherByID = async (req, res) => {
    //#swagger.tags=['Teachers']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Please enter a valid teacher id.")
    }
    const teacherId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('students').collection('teachers').find({ _id: teacherId });
    result.toArray((err) => {
        if (err) {
            res.status(400).json({message: err});
        }
    }).then((teachers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(teachers[0]);
    });

};

//Adds a teacher to the teachers collection
const addTeacher = async (req, res) => {
    //#swagger.tags=['Teachers']
    const teacher = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
        
    };
    const response = await mongodb.getDatabase().db('students').collection('teachers').insertOne(teacher);
    if (response.acknowledged) {
        res.status(204).send();

    } else {
        res.status(500).json(response.error || 'Something happened while adding the teacher');
    }
};

//Updates a teacher in the teacher collection using a valid MongodbId. 
//Errors will return if parameter is not a valid mongodbid, the id matches no teachers in the collection, 
//or the response/request was bad.
const updateTeacher = async (req, res) => {
    //#swagger.tags=['Teachers']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Please enter a valid teacher id.")
    }
    const teacherId = new ObjectId(req.params.id);
    const teacher = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };
    const response = await mongodb.getDatabase().db('students').collection('teachers').replaceOne({ _id: teacherId }, teacher);
    if (response.modifiedCount > 0) {
        res.status(204).send();

    } else {
        res.status(500).json(response.error || 'Something happened while updating the teacher');
    }
};

//Removes a teacher from the teachers collection using a valid mongodbid.
//Errors will return if parameter is not a valid mongodbid, the id matches no teachers in the collection, 
//or the response/request was bad.
const deleteTeacher = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Please enter a valid teacher id.")
    }
    //#swagger.tags=['Teacher']
    const teacherId =new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('students').collection('teachers').deleteOne({ _id: teacherId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Something happened while deleting the teacher');
    }
};



module.exports = {
    getAllTeachers,
    getTeacherByID,
    addTeacher,
    updateTeacher,
    deleteTeacher
}
