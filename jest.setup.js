const { initDb, closeConnection } = require('./data/database');

beforeAll((done) => {
	initDb((err) => {
		if (err) {
			console.error('Failed to connect to database', err);
			done(err);
		} else {
			done();
		}
	});
});

afterAll((done) => {
	closeConnection()
		.then(() => done())
		.catch((err) => done(err));
});
