const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	voteName: {
		type: String,
	},
	voteCode: {
		type: String,
	},
	startDate: {
		type: Date,
	},
	endDate: {
		type: Date,
	},
	candidate1: {
		type: String,
		required: true,
	},
	candidate2: {
		type: String,
		required: true,
	},
	candidate3: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	/*voteImage: {
		type: String,
		required: true,
	},*/
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model("endvote", UserSchema);
