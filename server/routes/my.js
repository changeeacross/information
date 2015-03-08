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
.get('/info', /* auth, */ function(req, res, next) {
	res.send('ok');
})
;


module.exports = router;
