const {
	getAllAssignments,
	addAssignment,
	getAssignmentByID,
	updateAssignment,
	deleteAssignment
} = require('../controllers/assignments');

expect.extend({
	toBeOneOf(received, expectedArray) {
		const pass = expectedArray.includes(received);
		if (pass) {
			return {
				message: () => `expected ${received} not to be one of [${expectedArray.join(', ')}]`,
				pass: true
			};
		} else {
			return {
				message: () => `expected ${received} to be one of [${expectedArray.join(', ')}]`,
				pass: false
			};
		}
	}
});

const testID = '';

describe('read assignments', () => {
	test('should get all assignments', async () => {
		const req = {};
		const res = {
			value: '',
			resStatus: 0,
			resHeaders: {},

			status(input) {
				this.resStatus = input;
				return this;
			},

			setHeader(key, value) {
				this.resHeaders[key] = value;
				return this;
			},

			json(input) {
				this.value = input;
				return this;
			}
		};

		try {
			await getAllAssignments(req, res);
		} catch (err) {
			expect(err.status).toBeOneOf([404, 500]);
			expect(err.message).toMatch(/^[\w\d?\s]+$/);
			return;
		}

		expect(res.resStatus).toBe(200);
		expect(res.value).toBeInstanceOf(Array);
	});
});

describe('create assignments', () => {
	test('should create an assignment', async () => {
		const req = {
			body: {
				title: 'Physics Homework',
				description: 'Complete the problems in Chapter 3.',
				dueDate: '2024-12-20',
				file: 'https://example.com/uploads/physics_homework.pdf',
				rubric: [
					'Understand the concepts of Chapter 3',
					'Solve all problems correctly',
					'Show all work and calculations'
				]
			}
		};

		const res = {
			value: '',
			resStatus: 0,
			resHeaders: {},

			status(input) {
				this.resStatus = input;
				return this;
			},

			setHeader(key, value) {
				this.resHeaders[key] = value;
				return this;
			},

			json(input) {
				this.value = input;
				return this;
			}
		};

		try {
			await addAssignment(req, res);
		} catch (err) {
			expect(err.status).toBe(500);
			expect(err.message).toMatch(/^[\w\d?\s]+$/);
			return;
		}

		expect(res.resStatus).toBe(201);
		expect(res.value).toBeInstanceOf(Object);
	});
});

describe('read an assignment', () => {
	test('should get an assignment', async () => {
		const req = {
			params: { id: testID }
		};

		const res = {
			value: '',
			resStatus: 0,
			resHeaders: {},

			status(input) {
				this.resStatus = input;
				return this;
			},

			setHeader(key, value) {
				this.resHeaders[key] = value;
				return this;
			},

			json(input) {
				this.value = input;
				return this;
			}
		};

		try {
			await getAssignmentByID(req, res);
		} catch (err) {
			expect(err.status).toBeOneOf([404, 500]);
			expect(err.message).toMatch(/^[\w\d?\s]+$/);
			return;
		}

		expect(res.resStatus).toBe(200);
		expect(res.value).toBeInstanceOf(Object);
	});
});

describe('update an assignment', () => {
	test('should update an assignment', async () => {
		const req = {
			params: { id: testID },
			body: {
				title: 'Atomic Homework',
				description: 'Complete the problems in Chapter 3.',
				dueDate: '2024-12-20',
				file: 'https://example.com/uploads/physics_homework.pdf',
				rubric: [
					'Understand the concepts of Chapter 3',
					'Solve all problems correctly',
					'Show all work and calculations'
				]
			}
		};

		const res = {
			value: '',
			resStatus: 0,
			resHeaders: {},

			status(input) {
				this.resStatus = input;
				return this;
			},

			setHeader(key, value) {
				this.resHeaders[key] = value;
				return this;
			},

			json(input) {
				this.value = input;
				return this;
			}
		};

		try {
			await updateAssignment(req, res);
		} catch (err) {
			expect(err.status).toBe(500);
			expect(err.message).toMatch(/^[\w\d?\s]+$/);
			return;
		}

		expect(res.resStatus).toBe(204);
	});
});

describe('delete an assignment', () => {
	test('should delete an assignment', async () => {
		const req = {
			params: { id: testID }
		};

		const res = {
			value: '',
			resStatus: 0,
			resHeaders: {},

			status(input) {
				this.resStatus = input;
				return this;
			},

			setHeader(key, value) {
				this.resHeaders[key] = value;
				return this;
			},

			json(input) {
				this.value = input;
				return this;
			}
		};

		try {
			await deleteAssignment(req, res);
		} catch (err) {
			expect(err.status).toBe(500);
			expect(err.message).toMatch(/^[\w\d?\s]+$/);
			return;
		}

		expect(res.resStatus).toBe(204);
	});
});
