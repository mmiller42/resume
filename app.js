'use strict';

var express = require('express');
var app = express();

app.enable('trust proxy');

app.use(function (req, res, next) {
	if (req.headers.host.split(':')[0] !== 'localhost' && req.protocol !== 'https') {
		return res.redirect('https://' + req.headers.host + req.url);
	}

	next();
});

app.use(express.static('assets'));

app.listen(process.env.PORT || 3000);
