'use strict';

var express = require('express');
var app = express();

app.use(express.static('assets'));

app.listen(process.env.PORT || 3000);
