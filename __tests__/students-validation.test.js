// npm i -D jest
// npm i node-mocks-http --save-dev

const httpMocks = require('node-mocks-http');
const { validationResult } = require('express-validator');
const { getByYearRules, getByStatusRules } = require('../utilities/students-validation');

// Unit Tests for getByYearRules
test("should accept a valid number", async () => {
    const req = httpMocks.createRequest({ params: { studentyear: '3' } });
    await getByYearRules()[0](req, {}, () => {});

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
});

test("should reject empty student year", async () => {
    const req = httpMocks.createRequest({ params: { studentyear: '' } });
    await getByYearRules()[0](req, {}, () => {});

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe('Please enter a number between 1 and 5.');
});

test("should reject non-integer student year", async () => {
    const req = httpMocks.createRequest({ params: { studentyear: 'abc' } });
    await getByYearRules()[0](req, {}, () => {});

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe('Please enter a number between 1 and 5.');
});

test("should reject out-of-range student year(s)", async () => {
    const req = httpMocks.createRequest({ params: { studentyear: '6' } });
    await getByYearRules()[0](req, {}, () => {});

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe('Please enter a number between 1 and 5.');
});

// Unit Tests for getByStatusRules
test("should accept a valid enrollment status (true)", async () => {
    const req = httpMocks.createRequest({ params: { enrollmentstatus: 'true' } });
    await getByStatusRules()[0](req, {}, () => {});

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
});

test("should accept a valid enrollment status (false)", async () => {
    const req = httpMocks.createRequest({ params: { enrollmentstatus: 'false' } });
    await getByStatusRules()[0](req, {}, () => {});

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
});

test("should reject empty enrollment status", async () => {
    const req = httpMocks.createRequest({ params: { enrollmentstatus: '' } });
    await getByStatusRules()[0](req, {}, () => {});

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe('Please enter a valid enrollment status (true or false).');
});

test("should reject invalid enrollment status (non-boolean)", async () => {
    const req = httpMocks.createRequest({ params: { enrollmentstatus: 'notboolean' } });
    await getByStatusRules()[0](req, {}, () => {});

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe('Please enter a valid enrollment status (true or false).');
});