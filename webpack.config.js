var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:8080',
		'webpack/hot/only-dev-server',
		'./lib/index.js'
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'build/bundle.js'
	},
	resolve: {
		extensions: ['', '.js']
	},
	module: {
		loaders: loaders
	},
	devServer: {
		contentBase: './public',
		noInfo: true,
		hot: true,
		inline: true
	},
	plugins: [
		new webpack.NoErrorsPlugin()
	]
};

