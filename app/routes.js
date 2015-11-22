var mongoose = require('mongoose');
var User = require('./model.js');

// Opens App Routes
module.exports = function(app) {
	// GET Routes
	// Retrieve records of all user in the db
	app.get('/api/users', function(req, res) {

		// Uses mongoose schema to run the search (empty conditions)
		var query = User.find({});
		query.exec(function(err, users) {
			if(err)
				res.send(err);
			res.json(users);
		});
	});

	// POST Routes
	// Save new users to DB
	app.post('/api/users', function(req, res) {
		var newuser = new User(req.body);

		newuser.save(function(err) {
			if(err)
				res.send(err);
			res.json(req.body);
		});
	});
};