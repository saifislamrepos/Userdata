process.env['NODE_ENV'] = 'prod';
const express = require('express');
const mongoose = require('mongoose');
const webpack = require('webpack');
const config = require('../config/webpack.dev.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackhotmodulereplacement = require("webpack-hot-middleware");
const app = express();
const router = require('../routers');
const cookieParser = require('cookie-parser');
const envvariables = require('../config/enviromentconstants');
const environment = process.env.NODE_ENV;
config.output.publicPath = '/';
const opn = require('opn')
var compiler = webpack(config);
var devmiddleware = webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
	watchOptions: {
		aggregateTimeout: 200,
		poll: 1000
	}
});
const env = envvariables[environment];
var hotreload = webpackhotmodulereplacement(compiler);
app.disable('x-powered-by');
app.use(cookieParser());
app.use('/', devmiddleware);
app.use('/', hotreload);
app.use('/', router);
mongoose.connect('mongodb://'+env.DB_SERVER + env.DB_PORT + env.DB, {
	useNewUrlParser: true,
	useFindAndModify:false
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('db connected');
});
app.listen(env.PORT, function () {
	console.log('app listening on port'+env.PORT+'!\n');
	opn("http://"+env.SERVER+env.PORT)
});