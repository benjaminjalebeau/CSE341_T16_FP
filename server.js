const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

//Sets up routes, middleware, and authentication
app
	.use(bodyParser.json())
	.use(
		session({
			secret: 'secret',
			resave: false,
			saveUninitialized: true
		})
	)
	.use(passport.initialize())
	.use(passport.session())
	.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
		);
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET, POST, PUT, DELETE, OPTIONS'
		);
		next();
	})
	.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }))
	.use(cors({ origin: '*' }))
	.use('/', require('./routes/index'));

//Takes data from the env file for your session
passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: process.env.CALLBACK_URL
		},
		function (accessToken, refreshToken, profile, done) {
			return done(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});

//sends a response to the root telling you if you're logged in or not
app.get('/', (req, res) => {
	res.send(
		req.session.user !== undefined
			? `Logged in as ${req.session.user.displayName}`
			: 'Logged Out'
	);
	// Checks all data stored in req.session.user
	//res.send(req.session.user !== undefined ? JSON.stringify(req.session.user, null, 4) : 'Logged Out')
});

app.get(
	'/github/callback',
	passport.authenticate('github', {
		failureRedirect: '/api-docs',
		session: false
	}),
	(req, res) => {
		req.session.user = req.user;
		res.redirect('/');
	}
);

/*General error handler for uncaught exceptions.*/
process.on('uncaughtException', (err, origin) => {
	console.log(
		process.stderr.fd,
		`Caught exception: ${err}\n` + `Exception origin: ${origin}`
	);
});

app.use((err, req, res, next) => {
	return res
		.status(err.status)
		.setHeader('Content-Type', 'application/json')
		.json({
			status: err.status,
			message: err.message
		});
});

//sets up connection to mongodb.
mongodb.initDb((err) => {
	if (err) {
		console.log(err);
	} else {
		app.listen(port, () => {
			console.log(`Database is listening and node running on port ${port}`);
		});
	}
});
