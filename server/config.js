'use strict';

module.exports = {
	TOKEN_SECRET: process.env.TOKEN_SECRET || 'betterMilkShake@wuct',
	TOKEN_EXP: 7 * 24 * 60, //minutes
	FB_APPID: process.env.FB_APPID,
	FB_APPSECRET: process.env.FB_APPSECRET,

};