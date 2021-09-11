const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Usercomp = require("../models/Usercomp");
const Vote = require("../models/Vote");
const VoteResult = require("../models/VoteResult");
const { ReplSet } = require("mongodb");
users.use(cors());

process.env.SECRET_KEY = "secret";

users.post("/register", (req, res) => {
	const today = new Date();
	const userData = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		sex: req.body.sex,
		age: req.body.age,
		location: req.body.location,
		
		created: today,
	};

	User.findOne({
		email: req.body.email,
	})
		.then((user) => {
			if (!user) {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					userData.password = hash;

					User.create(userData)
						.then((user) => {
							res.json({ status: user.email + " registered" });
						})
						.catch((err) => {
							res.send("error: " + err);
						});
				});
			} else {
				res.json({ error: "User already exists" });
			}
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});

users.post("/registercomp", (req, res) => {
	const today = new Date();
	const userData = {
		compName: req.body.compName,
		compNum: req.body.compNum,
		email: req.body.email,
		password: req.body.password,
		
		created: today,
	};

	User.findOne({
		email: req.body.email,
	})
		.then((user) => {
			if (!user) {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					userData.password = hash;

					Usercomp.create(userData)
						.then((user) => {
							res.json({ status: user.email + " registered" });
						})
						.catch((err) => {
							res.send("error: " + err);
						});
				});
			} else {
				res.json({ error: "User already exists" });
			}
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});

users.post("/makevote", (req, res) => {
	const today = new Date();
	const userData = {
		
		voteName: req.body.voteName,
		voteCode: req.body.voteCode,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		candidate1: req.body.candidate1,
		candidate2: req.body.candidate2,
		candidate3: req.body.candidate3,
		description: req.body.description,
		/*voteImage: req.body.voteImage,*/

		created: today,
	};

	User.findOne({
		voteCode: req.body.voteCode,
	})
		.then((user) => {
			if (!user) {
				Vote.create(userData)
						.then((user) => {
							res.json({ status: "vote done" });
						})
						.catch((err) => {
							res.send("error: " + err);
						});
				
			} else {
				res.json({ error: " already exists" });
			}
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});

users.post("/login", (req, res) => {
	User.findOne({
		email: req.body.email,
	})
		.then((user) => {
			if (user) {
				if (bcrypt.compareSync(req.body.password, user.password)) {
					const payload = {
						_id: user._id,
						firstName: user.firstName,
						lastName: user.lastName,
						sex: user.sex,
						age: user.age,
						location: user.location,
						email: user.email,
					};
					let token = jwt.sign(payload, process.env.SECRET_KEY, {
						expiresIn: 1440,
					});
					res.send(token);
					res.json({ success: true,
						message: "Login Success"});
				} else {
					res.json({ success: false,
						message: "User does not exist"});
					
				}
			} else {
				res.json({ success: false,
					message: "User does not exist"});
			}
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});

users.post("/logincomp", (req, res) => {
	Usercomp.findOne({
		email: req.body.email,
	})
		.then((user) => {
			if (user) {
				if (bcrypt.compareSync(req.body.password, user.password)) {
					const payload = {
						_id: user._id,
						compName: user.compName,
						compNum: user.compNum,
						email: user.email,
					};
					let token = jwt.sign(payload, process.env.SECRET_KEY, {
						expiresIn: 1440,
					});
					res.send(token);
					res.json({ success: true,
						message: "Login Success"});
				} else {
					res.json({ success: false,
						message: "User does not exist"});
				}
			} else {
				res.json({ success: false,
					message: "User does not exist"});
			}
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});

users.post("/voteresult", (req, res) => {
	const today = new Date();
	const userData = {
		
		code: req.body.code,
		candidate: req.body.candidate,
		sex: req.body.sex,
		age: req.body.age,
		location: req.body.location,

		created: today,
	};
	VoteResult.create(userData)
		.then((user) => {
			res.json({ status: "voteresult done" });
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});

users.get("/userlist", (req, res) => {
	User.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});
users.get("/userlistcomp", (req, res) => {
	Usercomp.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});

users.get("/votelist", (req, res) => {
	Vote.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});

module.exports = users;
