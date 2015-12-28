'use strict';

var express = require('express');
var app = express();

app.use(express.static('assets'));

app.listen(3000);
