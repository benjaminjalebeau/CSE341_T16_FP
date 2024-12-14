const { validationResult } = require('express-validator');
const { createRules, updateRules } = require('../utilities/assignments-validation');

describe('Validation rules to create an assignment', () => {
	test('should return error in title', async () => {
		const req = {
			body: {
				title: '',
				description: 'Complete the problems in Chapter 3.',
				dueDate: 'Wednesday 20, 12/2024',
				file: 'https://example.com/uploads/physics_homework.pdf',
				rubric: [
					'Understand the concepts of Chapter 3',
					'Solve all problems correctly',
					'Show all work and calculations'
				]
			}
		};

		await createRules()[0](req, {}, () => {});

		const errors = validationResult(req);

		expect(errors.isEmpty()).toBe(false);
	});

	test('should return error in date', async () => {
		const req = {
			body: {
				title: '',
				description: 'Complete the problems in Chapter 3.',
				dueDate: 'Wednesday 20, 12/2024',
				file: 'https://example.com/uploads/physics_homework.pdf',
				rubric: [
					'Understand the concepts of Chapter 3',
					'Solve all problems correctly',
					'Show all work and calculations'
				]
			}
		};

		await createRules()[2](req, {}, () => {});

		const errors = validationResult(req);

		expect(errors.isEmpty()).toBe(false);
	});

	test('should return error in file', async () => {
		const req = {
			body: {
				title: '',
				description: 'Complete the problems in Chapter 3.',
				dueDate: 'Wednesday 20, 12/2024',
				file: 'https://example.com\\uploads/physics_homework.pdf',
				rubric: [
					'Understand the concepts of Chapter 3',
					'Solve all problems correctly',
					'Show all work and calculations'
				]
			}
		};

		await createRules()[3](req, {}, () => {});

		const errors = validationResult(req);

		expect(errors.isEmpty()).toBe(false);

		const req2 = {
			body: {
				file: '../uploads/physics_homework.pdf'
			}
		};

		await createRules()[3](req2, {}, () => {});

		const errors2 = validationResult(req2);

		expect(errors2.isEmpty()).toBe(false);
	});

	test('should return error in rubric', async () => {
		const req = {
			body: {
				title: '',
				description: 'Complete the problems in Chapter 3.',
				dueDate: 'Wednesday 20, 12/2024',
				file: 'https://example.com\\uploads/physics_homework.pdf',
				rubric: [1, 'Solve all problems correctly', 'Show all work and calculations']
			}
		};

		await createRules()[4](req, {}, () => {});

		const errors = validationResult(req);

		expect(errors.isEmpty()).toBe(false);
	});
});

describe('Validation rules to update an assignment', () => {
	test('should validate id', async () => {
		const req = {
			params: { id: '60b9b2bc5f1b2c001c8bda64' }
		};

		await updateRules()[0](req, {}, () => {});

		const errors = validationResult(req);

		expect(errors.isEmpty()).toBe(true);
	});

	test('should return error in id', async () => {
		const req = {
			params: { id: '60b9b2bc5f1b2c001c8bda' }
		};

		await updateRules()[0](req, {}, () => {});

		const errors = validationResult(req);

		expect(errors.isEmpty()).toBe(false);
	});

	test('should return error in title', async () => {
		const req = {
			body: {
				title: '',
				description: 'Complete the problems in Chapter 3.',
				dueDate: 'Wednesday 20, 12/2024',
				file: 'https://example.com/uploads/physics_homework.pdf',
				rubric: [
					'Understand the concepts of Chapter 3',
					'Solve all problems correctly',
					'Show all work and calculations'
				]
			}
		};

		await updateRules()[1](req, {}, () => {});

		const errors = validationResult(req);

		expect(errors.isEmpty()).toBe(false);
	});

	test('should return error in date', async () => {
		const req = {
			body: {
				title: '',
				description: 'Complete the problems in Chapter 3.',
				dueDate: 'Wednesday 20, 12/2024',
				file: 'https://example.com/uploads/physics_homework.pdf',
				rubric: [
					'Understand the concepts of Chapter 3',
					'Solve all problems correctly',
					'Show all work and calculations'
				]
			}
		};

		await updateRules()[3](req, {}, () => {});

		const errors = validationResult(req);

		expect(errors.isEmpty()).toBe(false);
	});

	test('should return error in file', async () => {
		const req = {
			body: {
				title: '',
				description: 'Complete the problems in Chapter 3.',
				dueDate: 'Wednesday 20, 12/2024',
				file: 'https://example.com\\uploads/physics_homework.pdf',
				rubric: [
					'Understand the concepts of Chapter 3',
					'Solve all problems correctly',
					'Show all work and calculations'
				]
			}
		};

		await updateRules()[4](req, {}, () => {});

		const errors = validationResult(req);

		expect(errors.isEmpty()).toBe(false);

		const req2 = {
			body: {
				file: '../uploads/physics_homework.pdf'
			}
		};

		await updateRules()[4](req2, {}, () => {});

		const errors2 = validationResult(req2);

		expect(errors2.isEmpty()).toBe(false);
	});

	test('should return error in rubric', async () => {
		const req = {
			body: {
				title: '',
				description: 'Complete the problems in Chapter 3.',
				dueDate: 'Wednesday 20, 12/2024',
				file: 'https://example.com\\uploads/physics_homework.pdf',
				rubric: [1, 'Solve all problems correctly', 'Show all work and calculations']
			}
		};

		await updateRules()[5](req, {}, () => {});

		const errors = validationResult(req);

		expect(errors.isEmpty()).toBe(false);
	});
});
