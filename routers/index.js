const express = require('express');
const router = express.Router();
const path = require('path');
const controllers = require('../config/controller');
const bodyParser = require('body-parser');

router.post('/createuser',bodyParser.json(),controllers.checkUploadPath,controllers.uploadfile,controllers.createclass);
router.use('/getlist', controllers.getlist);
router.use('/delete-user', bodyParser.json(),controllers.deleteuser);
router.use('/update-user', bodyParser.json(),controllers.checkUploadPath,controllers.uploadfile,controllers.updateuser);
router.use('/insertall', controllers.createmany, function (req, res, next) {
	res.send('success')
});
router.use(function (err, req, res, next) {
	console.error(err.message); // Log error message in our server's console
	if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
	res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
router.use('/profileImages',express.static(path.join(__dirname,'../','./profileImages')));
router.use('/assets',express.static(path.join(__dirname,'./dist/assets')));

module.exports = router