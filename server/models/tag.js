// tag.js

'use strict';

var mongoose = require('mongoose')
,	Schema   = mongoose.Schema;


var tagSchema = new mongoose.Schema(
	{ name: { type: String, required: true, index: true, unique: true }
	, count : { type: Number, required: true, default: 1 }
	, createdAt : { type : Date, required: true, default: Date.now }
	
});
 
var Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;