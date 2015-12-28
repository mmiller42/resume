'use strict';

var express = require('express');
var app = express();

app.use(function (req, res, next) {
	if (!req.secure) {
		return res.redirect('https://' + req.headers.host + req.url);
	}

	next();
});

app.use(express.static('assets'));

app.listen(process.env.PORT || 3000);
