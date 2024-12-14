const request = require('supertest');
const express = require('express');
const router = require('../routes/teachers.js');
const teachersController = require("../controllers/teachers.js")
const { validationResult } = require('express-validator');

jest.mock('../controllers/teachers')

const app = express();
app.use('/teachers', router);

const mockFile = [
    {
        "_id":{"$oid":"67551c7dc6520c7c27168450"},
        "firstName":"Bob",
        "lastName":"Lopez",
        "email":"blop@example.com",
        "password":"Secured123!"
    },
    {
        "_id":{"$oid":"67551c7dc6520c7c27168451"},
        "firstName":"Joe",
        "lastName":"George",
        "email":"glop@example.com",
        "password":"ASecured123!"
    },
    {
        "_id":{"$oid":"67551c7dc6520c7c27168453"},
        "firstName":"Dana",
        "lastName":"Jackson",
        "email":"fluz@example.com",
        "password":"ANSecured123!"
    }

]

describe('Get Route Unit Tests', function() {

    test('/teachers gets all of teachers collection', async () => {

        teachersController.getAllTeachers.mockImplementation((req, res) => {
            res.status(200).json(mockFile)
        })
        const response = await request(app).get('/teachers');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockFile);
    });

    test('/teachers/:id} gets teacher by id', async () => {

        teachersController.getTeacherByID.mockImplementation((req, res) => {
            res.status(200).json(mockFile[0])
        })
        const response = await request(app).get('/teachers/67551c7dc6520c7c27168450');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockFile[0]);
    });

    test('/teachers/:id} wrong id', async () => {

        teachersController.getTeacherByID.mockImplementation((req, res) => {
            res.status(404).json([mockfile])
        })
        const response = await request(app).get('/teachers/67551c7dc6520c7c27168459');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({});
    });

    test('/teachers/:id} invalid id', async () => {
        const response = await request(app).get('/teachers/1');

        expect(response.statusCode).toBe(400);
        expect(response.body.details.id).toEqual("Please enter a valid id.");

    });

})



