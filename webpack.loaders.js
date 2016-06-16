module.exports = [
	{
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		loaders: ['babel'],
	},
	{
		test: /\.css$/,
		loader: 'style-loader!css-loader'
	},
	{
		test: /(bootstrap|jquery\.).*\.js/,
		loader: 'imports?jQuery=jquery,$=jquery,this=>window'
	},
	{
		test: /\.(eot|woff|woff2|ttf|svg|gif|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
		loader: 'file?name=./build/[hash].[ext]'
	}
];

