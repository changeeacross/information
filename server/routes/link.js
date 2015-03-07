// link router
'use strict';

var express = require('express');
var router = express.Router();
var MetaInspector = require('node-metainspector');

router.get('/', function(req, res, next) {
	var url = req.query.url;
	var client = new MetaInspector(url, {});
	 
	client.on("fetch", function(){
		// console.log(client);
		var info = {
			title: client.title,
			link: url,
			description: client.description,
			keywords: client.keywords,
			image: client.image
		}
		res.json(info);
	});
	 
	client.on("error", function (err){
		next(err);
	});
	 
	client.fetch();	 
});

module.exports = router;
