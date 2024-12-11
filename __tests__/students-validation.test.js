// npm i -D jest
// npm i node-mocks-http --save-dev

const httpMocks = require('node-mocks-http');
const { validationResult } = require('express-validator');
const { getByYearRules } = require('../utilities/students-validation');

test("should accept a valid student year", async () => {
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

test("should reject out-of-range student year", async () => {
    const req = httpMocks.createRequest({ params: { studentyear: '6' } });
    await getByYearRules()[0](req, {}, () => {});

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe('Please enter a number between 1 and 5.');
});
