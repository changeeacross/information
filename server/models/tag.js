// tag.js

'use strict';

var mongoose = require('mongoose')
,	Schema   = mongoose.Schema;


var tagSchema = new mongoose.Schema(
	// use _id to be the tag's name
	{ createdAt : { type : Date, required: true, default : Date.now }
});
 
var Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;