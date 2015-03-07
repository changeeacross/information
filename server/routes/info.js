// info router
'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Info = mongoose.model('Info');

// TODO: handle duplicate info
router.post('/', function(req, res, next) {
	// console.log(req.body);
	var info = new Info(req.body);
	info.save(function (err, info) {
		if (err) return next(err);
		res.json(info);
	});
});

module.exports = router;
