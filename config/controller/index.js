const models = require('../model');
const mongoose = require('mongoose');
const fs = require('fs');
const uploadPath = "profileImages/";
const multer  =   require('multer');
const path = require('path');

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
        photo:req.body.photo
    }
    const count = testmodel.countDocuments({}, function (err, count) {
        data.id = count;
        var newobj = new testmodel(data);
        var error = newobj.validateSync();
        if (error) next(error);
        testmodel.find({
            'name': req.body.name,
            'category': req.body.category
        }, function (err, doc) {
            if (err) {
                next(error);
            }
            if (doc.length) {
                next(new Error('User Already Exists'));
            } else {
                newobj.save(function (err, newobj) {
                    if (err) return console.error(err);
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
    let resp = {}
    if (mongoose.connection.readyState != 1) {
        throw new Error('mongodb not connected');
        return
    }
    models['usermodel'].find((err, doc) => {
        if (err) {
            next(err)
        }
        res.json(doc)
    });
}

exports.checkUploadPath = function checkUploadPath(req, res, next) {
    fs.exists(uploadPath, function(exists) {
       if(exists) {
         next();
       }
       else {
         fs.mkdir(uploadPath, function(err) {
           if(err) {
             console.log('Error in folder creation');
             next(); 
           }  
           next();
         })
       }
    })
}
exports.uploadfile = function(req,res,next){
    if (mongoose.connection.readyState != 1) {
        throw new Error('mongodb not connected');
        return
    }
    upload(req,res,function(err) {
        if(req.file) {
            req.body.photo = req.file.filename;
        } else {
            next();
        }
        if(err) {
			console.log(err)
            next(err);
        }
        next()
    });
}
exports.deleteuser = function deleteuser(req, res, next) {
    let resp = {}
    if (mongoose.connection.readyState != 1) {
        throw new Error('mongodb not connected');
        return
    }
    let user = req.body

    models['usermodel'].deleteOne(user,(err, doc) => {
        if (err) {
            next(err)
        }
        const imgpath = '/profileImages/'+user.photo
        const imgpatht = path.join(__dirname,'../../',imgpath)
        fs.unlink(imgpatht, (err) => {
            if (err) {
                next(err)
            }
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
    res.send("user updated");
    models['usermodel'].findOneAndUpdate(olduser,{$set:newdata},{new: true},).then( (doc) => {
        console.log("updated");
    }
        
    );
}