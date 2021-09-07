const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	compName: {
		type: String,
	},
	compNum: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Usercomp = mongoose.model("usercomps", UserSchema);//요게 model 명을 "usercomps"로 해서 생성하겠다는 의미였엉
