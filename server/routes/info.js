// info router
'use strict';

var express = require('express');
var _ = require('lodash');
var Promise = require('bluebird');
var router = express.Router();
var mongoose = require('mongoose');
var Info = mongoose.model('Info');
var Vote = mongoose.model('Vote');
var auth = require('./auth');

// TODO: handle duplicate info
router
.post('/', auth, function(req, res, next) {
	// console.log(req.body);
	var info = new Info(_.assign(req.body, {
		_poster: req.user._id,
	}));
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
})
.get('/:_id/vote', auth, function(req, res, next) {

	Info
	.findByIdAsync(req.params._id)
	.then(function (info) {
		if (!info) {
			res.status(400);
			throw new Error('can not find info by _id ' + req.params._id);
		}

		var _vote_ = {
			_fromUser: req.user._id,
			_info: req.params._id,
		};
		var newType = req.query.type === 'up' || req.query.type === 'down'
			? req.query.type
			: 'up';

		return Vote
		.findOneAsync(_vote_)
		.then(function (vote) {
			// new vote
			if (!vote) {
				var vote = new Vote(_vote_);
				vote.type = newType;
				info[vote.type]++;
				return Promise.all([vote.saveAsync(), info.saveAsync()]);
			}

			// same vote
			if (vote.type === newType) return [vote, info];
			// update vote
			info[newType]++;
			info[vote.type]--;
			vote.type = newType;
			return Promise.all([vote.saveAsync(), info.saveAsync()]);
		});
	})
	.spread(function (vote, info) {
		// console.log(vote)
		// console.log(info)
		res.sendStatus(204) // no content
	})
	.catch(function (err) {
		if (res.status == 400) return res.send(err.message);
		next(err);
	});
})
;


module.exports = router;
