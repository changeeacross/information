// info router
'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Info = mongoose.model('Info');

// TODO: handle duplicate info
router
.post('/', function(req, res, next) {
	// console.log(req.body);
	var info = new Info(req.body);
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
