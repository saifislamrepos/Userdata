var mongoose = require('mongoose');
const schema = new mongoose.Schema({
	id: { type: Number, required: true } ,
	name:  { type: String, required: true } ,
	category:  { type: String, required: true } ,
	photo:{type: String, required: true}
}, {
	versionKey: false
});
exports.usermodel = mongoose.model('users', schema);