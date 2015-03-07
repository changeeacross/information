// vote.js

'use strict';

var mongoose = require('mongoose')
,	Schema   = mongoose.Schema;


var schema = new Schema(
	{ createdAt : { type : Date, required: true, default : Date.now }
	, fbId: { type: String }
	, email: { type: String }
	, name: { type: String }
});
 
var Vote = mongoose.model('Vote', schema);

module.exports = Vote;