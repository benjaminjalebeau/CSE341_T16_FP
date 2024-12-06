class AppError {
	constructor(status, message) {
		this.status = status;
		this.message = message;
	}
}

class ValidationError {
	constructor(status, message, details) {
		this.status = status;
		this.message = message;
		this.details = details;
	}
}

function handleErrors(fn) {
	return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

function detailValidationErrors(errors) {
	return errors.reduce((acc, err) => {
		acc[err.path] = err.msg;
		return acc;
	}, {});
}

module.exports = {
	AppError,
	ValidationError,
	handleErrors,
	detailValidationErrors
};
