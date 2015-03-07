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

// TODO: refactor this to DAO
infoSchema.post('save', function (info) {
	if (info.tags.length == 0) return;
	var Tag = mongoose.model('Tag');
	info.tags.map(function (tag) {
		Tag.update({
			name: tag,
		}, {
			$inc: { count: 1 }
		}, {
			upsert: true
		}, function (err, numOfEffect) {
			if (err) return console.log(err);
		});
	});
});

var Info = mongoose.model('Info', infoSchema);

module.exports = Info;