const express = require('express');
const mongoose = require('mongoose');
const webpack = require('webpack');
const config = require('../config/webpack.dev.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackhotmodulereplacement = require("webpack-hot-middleware");
const app = express();
const router = require('../routers');
const cookieParser = require('cookie-parser');
config.output.publicPath = '/';
var compiler = webpack(config);
var devmiddleware = webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
	watchOptions: {
		aggregateTimeout: 200,
		poll: 1000
	}
});
var hotreload = webpackhotmodulereplacement(compiler);
app.disable('x-powered-by');
app.use(cookieParser());
app.use('/', devmiddleware);
app.use('/', hotreload);
app.use('/', router);

mongoose.connect('mongodb://localhost/userdata', {
	useNewUrlParser: true,
	useFindAndModify:false
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('db connected');
});
app.listen(3002, function () {
	console.log('app listening on port 3002!\n');
	console.log(process.env.environment);
});