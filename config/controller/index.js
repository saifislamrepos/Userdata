const models = require('../model');
const mongoose = require('mongoose');
const fs = require('fs');
const uploadPath = "profileImages/";
const multer  =   require('multer');
const path = require('path');
const axios = require('axios');

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		const dir= 'profileImages/';
		callback(null, dir);
	},
	filename: function (req, file, callback) {
		callback(null, req.body.photoname+'.png');
	}
});
const upload = multer({ storage : storage}).single('userPhoto');
exports.createclass = function _createclass(req, res, next) {
    const testmodel = models.usermodel;
    var data = {
        id: 0,
        name: req.body.name,
        category: req.body.category,
        gender:req.body.gender
    }
    if(req.body.photo != undefined){
        data.photo=req.body.photo;
    }
    const count = testmodel.countDocuments({}, function (err, count) {
        data.id = count;
        var newobj = new testmodel(data);
        var error = newobj.validateSync();
        if (error) {
            console.log("some error occured in counting database");
            return next(error);
        } 
        testmodel.find({
            'name': req.body.name,
            'category': req.body.category
        }, function (err, doc) {
            if (err) {
                console.log("some error occured in creating database")
                next(new Error('some error occured in creating database'));
            }
            if (doc.length) {
                console.log("document already exists");
                next(new Error('User Already Exists'));
                return;
            } else {
                newobj.save(function (err, newobj) {
                    if (err) return console.error(err);
                    console.log(data,"document created succesfully");
                    res.send('sucesss')
                });
            }
        });
    });
}

exports.createmany = function _createmany(req, res, next) {
    typomodel.insertMany(test, function (err, newobj) {
        if (err) return console.error(err);
        res.send('sucesss')
    });

}
exports.getlist = function getlist(req, res, next) {
    const resp = {
        auth:req.auth
    }
    if(typeof req.username != "undefined") {
        resp.username = req.username;
    }
    if (mongoose.connection.readyState != 1) {
        throw new Error('mongodb not connected');
        return
    }
    models['usermodel'].find((err, doc) => {
        if (err) {
            next(err)
        }
        console.log(resp)
        console.log(doc.length + ' users found');
        resp.users = doc
        res.json(resp)
    });
}

exports.checkUploadPath = function checkUploadPath(req, res, next) {
    fs.exists(uploadPath, function(exists) {
       if(exists) {
        console.log('folder exists');
         next();
       }
       else {
         fs.mkdir(uploadPath, function(err) {
           if(err) {
             console.log('Error in folder creation');
             next(); 
           }
           console.log('folder created');
           next();
         })
       }
    })
}
exports.uploadfile = function(req,res,next){
    if (mongoose.connection.readyState != 1) {
        throw new Error('mongodb not connected');
        return;
    }
    upload(req,res,function(err) {
        if(req.file) {
            req.body.photo = req.file.filename;
        } else {
            console.log('no file uploaded');
            next();
            return;
        }
        if(err) {
			console.log(err)
            next(err);
        }
        console.log('image created');
        next()
    });
}
exports.deleteuser = function deleteuser(req, res, next) {
    let resp = {}
    if (mongoose.connection.readyState != 1) {
        throw new Error('mongodb not connected');
        return
    }
    let user = req.body;
    models['usermodel'].deleteOne(user,(err, doc) => {
        if (err) {
            console.log('error in deleting database');
            next(err);
            return
        }
        const imgpath = '/profileImages/'+user.photo
        const imgpatht = path.join(__dirname,'../../',imgpath)
        fs.unlink(imgpatht, (err) => {
            console.log('file deleted');
            res.send('user deleted');
            res.end();
        })
    });
}
exports.updateuser = function deleteuser(req, res, next) {
    let resp = {}
    if (mongoose.connection.readyState != 1) {
        throw new Error('mongodb not connected');
        return
    }
    const data = req.body;
    const newdata = {
        _id: data.euser_id,
        id:Math.random()
    }
    const olduser = {
        name:data.eusername,
        _id: data.euser_id
    }
    if(data.name != 'undefined'){
        newdata.name=data.name;
    }
    if(data.category != 'undefined'){
        newdata.category=data.category
    }
    if(req.body.photo){
        newdata.photo=req.body.photo;
    }
    if(typeof(data.gender) != 'undefined') {
        newdata.gender=data.gender
    }
    res.send("user updated");
    models['usermodel'].findOneAndUpdate(olduser,{$set:newdata},{new: true},).then( (doc) => {
        console.log("updated",newdata);
    }
        
    );
}
exports.verify = function _verify(req,res,next) {
    const user = {
        token:req.cookies.token,
        userid:req.cookies.userid
    }
    if(typeof user.userid == "undefined" || typeof user.token == "undefined") {
        return next();
    }
    axios.post("http://localhost:3000/verify", user).then( (response)=> {
        req.auth = true;
        req.username=response.data;
        next()
      })
      .catch( (error) => {
        req.auth = false;
        next()
    });
}
exports.signin = function _signin(req,res,next) {
    const { username, password } = req.body;
    axios.post("http://localhost:3000/signIn", req.body).then( (response)=> {
        const cookie = response.data;
        for(let cookie in response.data) {
            res.cookie(cookie,  response.data[cookie], { maxAge: 24*60*60 * 1000 })
        }
        res.end()
      })
      .catch( (error) => {
        console.log('error')
        next()
    });
}
exports.signredirct = function _signredirct(req,res,next) {
    return req.auth?res.send(req.username):res.status(401).end();
}
exports.logout = function _signredirct(req,res,next) {
    res.clearCookie("token");
    res.clearCookie("userid");
    return res.redirect("/");
}