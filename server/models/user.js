// user.js

'use strict';

var mongoose = require('mongoose')
,	Schema   = mongoose.Schema;


var userSchema = new mongoose.Schema(
	{ createdAt : { type : Date, required: true, default : Date.now }
	, fbId: { type: String }
	, email: { type: String }
});
 
var User = mongoose.model('User', userSchema);

module.exports = User;