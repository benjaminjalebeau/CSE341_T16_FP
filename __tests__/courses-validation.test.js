// npm i -D jest
// npm i node-mocks-http --save-dev

const httpMocks = require('node-mocks-http');
const { validationResult } = require('express-validator');
const { createRules, updateRules } = require('../utilities/courses-validation');

// Test for GET by course ID validation
test("should accept a valid course ID", async () => {
    const req = httpMocks.createRequest({ params: { id: '60b9b2bc5f1b2c001c8bda64' } });
    await updateRules()[0](req, {}, () => {}); // course ID rule is the first in updateRules

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
});

test("should reject an invalid course ID", async () => {
    const req = httpMocks.createRequest({ params: { id: 'invalidcourseid' } });
    await updateRules()[0](req, {}, () => {});

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe('Please enter a valid course ID (24-character hexadecimal).');
});

// Test for teacher ID validation (should be in the body, not params)
test("should accept a valid teacher ID", async () => {
    const req = httpMocks.createRequest({ body: { teacherId: '60b9b2bc5f1b2c001c8bda64' } });
    await createRules()[1](req, {}, () => {}); // teacher ID rule is the second in createRules

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
});

test("should reject an invalid teacher ID", async () => {
    const req = httpMocks.createRequest({ body: { teacherId: 'invalidteacherid' } });
    await createRules()[1](req, {}, () => {});

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe('Please enter a valid teacher ID (24-character hexadecimal).');
});

// Test for student ID validation (inside studentsEnrolled array)
test("should accept a valid student ID", async () => {
    const req = httpMocks.createRequest({ body: { studentsEnrolled: ['60b9b2bc5f1b2c001c8bda64'] } });
    await createRules()[0](req, {}, () => {}); // student ID rule is the first in createRules

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
});

test("should reject an invalid student ID", async () => {
    const req = httpMocks.createRequest({ body: { studentsEnrolled: ['invalidstudentid'] } });
    await createRules()[0](req, {}, () => {});

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe('Each studentID must be a valid MongoDB Id.');
});
