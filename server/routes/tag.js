// tag router
'use strict';

var express = require('express');
var router = express.Router();
var MetaInspector = require('node-metainspector');

router.get('/', function(req, res, next) {
	res.send('i')
});

module.exports = router;
