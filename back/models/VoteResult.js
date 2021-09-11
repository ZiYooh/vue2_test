const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  code: {
		type: String,
		required: true,
	},
  candidate: {
		type: String,
		required: true,
	},
	sex: {
		type: String,
		required: true,
	},
	age: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model("voteresult", UserSchema);