const express = require('express');
var proxyMiddleware = require('http-proxy-middleware')
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const controllers = require('./config/controller');
const bodyParser = require('body-parser');
app.set('view engine', 'pug');
app.set('views','./views');
 
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './dist/index.html'));
});
app.post('/createuser',bodyParser.json(),controllers.checkUploadPath,controllers.uploadfile,controllers.createclass);
app.use('/getlist', controllers.getlist)
app.use('/insertall', controllers.createmany, function (req, res, next) {
	res.send('success')
});
app.use('/delete-user', bodyParser.json(),controllers.deleteuser);
app.use(function (err, req, res, next) {
	console.error(err.message);
	if (!err.statusCode) err.statusCode = 500;
	res.status(err.statusCode).send(err.message);
});
mongoose.connect('mongodb://localhost/userdata', {
	useNewUrlParser: true
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('db connected');
});
app.use('/profileImages',express.static(path.join(__dirname,'./profileImages')));

app.use('/assets',express.static(path.join(__dirname,'./dist/assets')));
app.listen(3002, function () {
	console.log('app listening on port 3002!\n');
});
