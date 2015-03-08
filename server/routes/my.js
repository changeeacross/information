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
.get('/info', /* auth, */ function (req, res, next) {
	// test
	req.user = {_id: '54fb4e93c2a4a8292b0f4de7'}
	Info
	.find({ _poster: req.user._id })
	.exec(function (err, infos) {
		if (err) return next(err);
		res.send(infos);
	});
})
;


module.exports = router;
