// auth router
'use strict';

var express = require('express');
var router = express.Router();

router.post('/token/exchange', function(req, res, next) {
	console.log(req.body);
	if (!req.body) return res.send(400, 'missing request body.');
	if (!req.body.token) return res.send(400, 'missing token.');
	if (!req.body.provider) return res.send(400, 'missing token provider.');
	
	res.send('ok')
});

module.exports = router;
