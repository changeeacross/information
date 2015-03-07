// vote.js

'use strict';

var mongoose = require('mongoose')
,	Schema   = mongoose.Schema;


var schema = new Schema(
	{ createdAt : { type : Date, required: true, default : Date.now }
	, _fromUser : { type: Schema.Types.ObjectId,  ref: 'User', required: true }
	, _info : { type: Schema.Types.ObjectId,  ref: 'Info', required: true }
	, type: { type: String, required: true, default: 'up' } // 'up' or 'down'
});
 
var Vote = mongoose.model('Vote', schema);

module.exports = Vote;