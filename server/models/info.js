// info.js
'use strict';

var mongoose = require('mongoose')
,	Schema   = mongoose.Schema;


var infoSchema = new mongoose.Schema(

	{ link      : { type: String, required: true }
	, title      : { type: String, required: true }
	, image      : { type: String, required: true }
	, description      : { type: String }
	, tags      : { type: Array, required: true, default: [] }
	, upVote    : { type : Number, required: true, default: 0 }
	, downVote  : { type : Number, required: true, default: 0 }
	, createdAt : { type : Date, required: true, default : Date.now }
});
 
var Info = mongoose.model('Info', infoSchema);

module.exports = Info;