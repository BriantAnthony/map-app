var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a User Schema.
var UserSchema = new Schema({
	username: {type: String, required: true},
	gender: {type: String, required: true},
	age: {type: Number, required: true},
	favlang: {type: String, required: true},
	location: {type: [Number], required: true}, // [Long, Lat]
	htmlverified: Boolean,
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
});

// Sets the created_at parameter equal to the current time
UserSchema.pre('save', function(next){
	now = new Date();
	this.updated_at = now;
	this.gender = this.gender.toLowerCase();
	this.favlang = this.favlang.toLowerCase();

	if(!this.created_at) {
		this.created_at = now
	}
	next();
});

// Index this schema in 2dsphere format, crital for proximity searches
UserSchema.index({location: '2dsphere'});

// Exports UserSchema and sets MongoDB collection
module.exports = mongoose.model('map-user', UserSchema);