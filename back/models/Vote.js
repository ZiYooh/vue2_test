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
	candidates: {
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

module.exports = User = mongoose.model("vote", UserSchema);
