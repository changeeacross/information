// user.js

'use strict';

var mongoose = require('mongoose')
,	Schema   = mongoose.Schema;


var userSchema = new mongoose.Schema(
	// use _id to be the tag's name
	{ createdAt : { type : Date, required: true, default : Date.now }
});
 
var User = mongoose.model('User', userSchema);

module.exports = User;