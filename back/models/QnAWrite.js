const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	board_code: {
		type: String,
	},
	subject: {
		type: String,
	},
	content: {
		type: String,
	},
  answer: {
    type: String,
  },
	writer: {
		type: String,
	},
	id: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model("QnAWrite", UserSchema);
