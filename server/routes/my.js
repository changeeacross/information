// my.js

// info router
'use strict';

var express = require('express');
// var _ = require('lodash');
// var Promise = require('bluebird');
var router = express.Router();
var mongoose = require('mongoose');
var Info = mongoose.model('Info');
var Vote = mongoose.model('Vote');
var auth = require('./auth');

router
.get('/info', auth, function (req, res, next) {
	Info
	.find({ _poster: req.user._id })
	.exec(function (err, infos) {
		if (err) return next(err);
		res.send(infos);
	});
})
.get('/vote', auth, function (req, res, next) {
	Vote
	.find({ _fromUser: req.user._id })
	.exec(function (err, votes) {
		if (err) return next(err);
		res.send(votes);
	});
})
;


module.exports = router;
