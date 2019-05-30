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
app.use('/', router);
mongoose.connect('mongodb://localhost/userdata', {
	useNewUrlParser: true
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('db connected');
});

app.listen(3002, function () {
	console.log('app listening on port 3002!\n');
});
