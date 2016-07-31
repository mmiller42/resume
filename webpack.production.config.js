var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');

module.exports = {
	entry: [
		'./lib/index.js'
	],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'build/bundle.js'
	},
	resolve: {
		extensions: ['', '.js']
	},
	module: {
		loaders: loaders
	}
};

