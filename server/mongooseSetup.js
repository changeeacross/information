// 2013.11.1
// mongooseSetup.js
// wuct

'use strict';

var clc = require('cli-color')
,	fs = require('fs')
;

exports.setup = function(app) {
	var databaseUrl = 'production' == app.get('env') && !!process.env.DATABASE_URL
		? process.env.DATABASE_URL
		: 'mongodb://localhost/information';
	var mongoose = require('mongoose')
	mongoose.connect(databaseUrl);
	// mongoose.set('debug', true);
	
	var filenames = fs.readdirSync('./models')
	// console.log(filenames);
	filenames.forEach( function (filename) {
		require('./models/' + filename);
	});
	console.log(clc.greenBright('   info  -'),'mongoose is up');
};