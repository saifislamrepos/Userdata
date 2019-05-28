const express = require('express');
const mongoose = require('mongoose');
const webpack = require('webpack');
const config = require('../config/webpack.dev.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const bodyParser = require('body-parser');
const webpackhotmodulereplacement = require("webpack-hot-middleware");
const controllers = require('../config/controller');
const path = require('path');
const app = express();
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
app.use('/', devmiddleware);
app.use('/', hotreload);
app.post('/createuser',bodyParser.json(),controllers.checkUploadPath,controllers.uploadfile,controllers.createclass);
app.use('/getlist', controllers.getlist);
app.use('/delete-user', bodyParser.json(),controllers.deleteuser);
app.use('/insertall', controllers.createmany, function (req, res, next) {
	res.send('success')
});
app.use(function (err, req, res, next) {
	console.error(err.message); // Log error message in our server's console
	if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
	res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
mongoose.connect('mongodb://localhost/userdata', {
	useNewUrlParser: true
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('db connected');
});
app.use('/profileImages',express.static(path.join(__dirname,'../','./profileImages')));
app.listen(3002, function () {
	console.log('app listening on port 3002!\n');
	console.log(process.env.environment);
});