// tag router
'use strict';

var express = require('express');
var router = express.Router();
var MetaInspector = require('node-metainspector');
var mongoose = require('mongoose');
var Tag = mongoose.model('Tag');

router.get('/', function(req, res, next) {
	if (!req.query.name) return res.status(400).send('missing query name.');
	Tag
	.findAsync({
		name: { $regex: '\w*' + req.query.name + '\w*' }
	})
	.then(function (tags) {
		res.send(tags)
	})
	.catch(function (err) {
		next(err);
	});
});

module.exports = router;
