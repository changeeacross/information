// info.js
'use strict';

var mongoose = require('mongoose')
,	Schema   = mongoose.Schema;


var schema = new Schema(

	{ link      : { type: String, required: true }
	, title      : { type: String, required: true }
	, image      : { type: String, required: true }
	, description      : { type: String }
	, tags      : { type: Array, required: true, default: [], index: true }
	, _poster : { type: Schema.Types.ObjectId,  ref: 'User', required: true }
	, up    : { type : Number, required: true, default: 0 }
	, down  : { type : Number, required: true, default: 0 }
	, createdAt : { type : Date, required: true, default : Date.now }
});

// TODO: refactor this to DAO
schema.post('save', function (info) {
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


var Info = mongoose.model('Info', schema);

module.exports = Info;