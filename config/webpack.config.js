const path = require('path');
const webpack = require('webpack');

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}
module.exports = {
	entry: ['./src/index.js'],
	output: {
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.json','.css'],
		alias: {
			'@': resolve('src')
		}
	},
	module: {
		rules: [{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [
						'@babel/preset-react',
						'@babel/preset-env'
					]
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
					  '@babel/preset-react',
					  '@babel/preset-env'
					],
					plugins: [ "transform-class-properties" ]
				  }
			},
			{
				test: /\.styl(us)?$/,
				use: [ 'css-loader', 'stylus-loader','sass-loader']
			}
		]
	}
};