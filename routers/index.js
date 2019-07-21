const express = require('express');
const router = express.Router();
const path = require('path');
const controllers = require('../config/controller');
const bodyParser = require('body-parser');

router.use('/createuser',bodyParser.json(),controllers.checkUploadPath,controllers.uploadfile,controllers.createclass);
router.use('/getlist',controllers.verify,controllers.getlist);
router.get('/verify',bodyParser.json(),controllers.verify,controllers.signredirct);
router.use('/delete-user', bodyParser.json(),controllers.deleteuser);
router.use('/update-user', bodyParser.json(),controllers.checkUploadPath,controllers.uploadfile,controllers.updateuser);
router.use('/insertall', controllers.createmany, function (req, res, next) {
	res.send('success')
});
router.use('/logout', bodyParser.json(),controllers.logout);
router.use('/signIn', bodyParser.json(),controllers.signin);
router.use('/profileImages',express.static(path.join(__dirname,'../','./profileImages')));
router.get('*js', controllers.serveGzipped('text/javascript'));
router.use('/assets',express.static(path.join(__dirname,'../dist/assets')));
router.use(function (err, req, res, next) {
	console.log('error');
	if (!err.statusCode) err.statusCode = 500; 
	res.status(err.statusCode).send(err.message);
});

module.exports = router