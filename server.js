process.env['NODE_ENV'] = 'prod';
const express = require('express');
var proxyMiddleware = require('http-proxy-middleware')
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const router = require('./routers');
const cookieParser = require('cookie-parser');
const envvariables = require('./config/enviromentconstants');
const environment = process.env.NODE_ENV;
const env = envvariables[environment];
app.set('view engine', 'pug');
app.set('views','./views');
app.disable('x-powered-by');
app.use(cookieParser());
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './dist/index.html'));
});
app.use('/', router);
mongoose.connect('mongodb://'+env.DB_SERVER + env.DB_PORT + env.DB, {
	useNewUrlParser: true
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('db connected');
});

app.listen(env.PORT, function () {
	console.log('app listening on port'+env.PORT+'!\n');
});
