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

	// Retrieves JSON for all users who meet certain query conditions
	app.post('/api/query/', function(req, res) {

		// Grab all of the query parameter from the body
		var lat = req.body.latitude;
		var long = req.body.longitude;
		var distance = req.body.distance;
		var male = req.body.male;
		var female = req.body.female;
		var other = req.body.other;
		var minAge = req.body.minAge;
		var maxAge = req.body.maxAge;
		var favlang = req.body.favlang;
		var reqverified = req.body.reqverified;

		// Opens a generic Mongoose Query. 
		var query = User.find({});

		// Max distance filter
		if(distance){

			// Geospatial query
			query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

				maxDistance: distance * 1609.34, spherical: true});
		}

		// Gender Options Filter
		if(male || female || other){
			query.or([{ 'gender': male }, { 'gender': female }, { 'gender': other }]);
		}

		// Minimum Age Filter
		if(minAge){
			query = query.where('age').gte(minAge);
		}

		// Max Age Filter
		if(maxAge){
			query = query.where('age').lte(maxAge);
		}

		// Favorite Language Filter
		if(favlang){
			query = query.where('favlang').equals(favlang);
		}

		// Include HTML verified Location Filter
		if(reqverified){
			query = query.where('htmlverified').equals(true);
		}

		// Execute Query and Return results
		query.exec(function(err, users) {
			if(err)
				res.send(err);
			res.json(users);
		});
	});
};