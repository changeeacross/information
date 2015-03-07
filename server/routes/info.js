// info router
'use strict';

var express = require('express');
var _ = require('lodash');
var router = express.Router();
var mongoose = require('mongoose');
var Info = mongoose.model('Info');
var auth = require('./auth');

// TODO: handle duplicate info
router
.post('/', auth, function(req, res, next) {
	// console.log(req.body);
	var info = new Info(_.assign(req.body, {
		_poster: req.user._id,
	}));
	console.log(info)
	info.save(function (err, info) {
		if (err) return next(err);
		res.json(info);
	});
})
.get('/', function(req, res, next) {
	if (!req.query.tag) return res.status(400).send('missing query tag.');
	Info
	.find({ tags: req.query.tag })
	.exec(function (err, infos) {
		if (err) return next(err);
		res.send(infos);
	});
});


module.exports = router;
