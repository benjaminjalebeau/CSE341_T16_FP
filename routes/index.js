const router = require('express').Router();
const passport = require('passport');

//Swagger route
router.use('/', require('./swagger'));

//Routes for each collection
router.use('/students', require('./students'));
router.use('/teachers', require('./teachers'));
router.use('/courses', require('./courses'));
router.use('/assignments', require('./assignments'));

//Checks the client id and secret to log you in or deny your request.
//I'm not sure yet which is the best practice for adding new users to the github Oauth application to get the client id and secret.
router.get('/login', passport.authenticate('github'), (req, res) => {});

//Disconnects the app from your github account
router.get('/logout', function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});

module.exports = router;
