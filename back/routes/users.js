const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Usercomp = require("../models/Usercomp");
const Vote = require("../models/Vote");
const VoteResult = require("../models/VoteResult");
const Write = require("../models/Write");
const QnAWrite = require("../models/QnAWrite");
const EndVote = require("../models/EndVote");
const { ReplSet } = require("mongodb");
users.use(cors());

process.env.SECRET_KEY = "secret";

// 공지사항 작성 처리
users.post("/write", (req, res) => {
	const today = new Date();
	const userData = {
		
		subject: req.body.subject,
		writer: req.body.writer,
		content: req.body.content,
		/*voteImage: req.body.voteImage,*/

		created: today,
	};

	Write.findOne({
		subject: req.body.subject,
	})
		.then((notice) => {
			if (!notice) {
				Write.create(userData)
						.then((noticer) => {
							res.json({ status: "write success" });
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

// 공지사항 수정 처리
users.post("/upd", (req, res) => {
	const today = new Date();
	const userData = {
		
		subject: req.body.subject,
		writer: req.body.writer,
		content: req.body.content,
		/*voteImage: req.body.voteImage,*/

		created: today,
	};
	Write.updateOne({
		subject: req.body.oldsubject,
	}, {
		subject: req.body.subject,
		content: req.body.content,
		writer: req.body.writer,
	})
	.then((notice) => {
		if (!notice) {
			Write.create(userData)
					.then((noticer) => {
						res.json({ status: "write success" });
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

// QnA 작성 처리
users.post("/qnawrite", (req, res) => {
	const today = new Date();
	const userData = {
		
		subject: req.body.subject,
		writer: req.body.writer,
		content: req.body.content,
		answer: req.body.answer,
		created: today,
	};

	QnAWrite.findOne({
		subject: req.body.subject,
	})
		.then((notice) => {
			if (!notice) {
				QnAWrite.create(userData)
						.then((noticer) => {
							res.json({ status: "write success" });
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

users.post("/qnaupd", (req, res) => {
	const today = new Date();
	const userData = {
		
		subject: req.body.subject,
		writer: req.body.writer,
		content: req.body.content,
		/*voteImage: req.body.voteImage,*/

		created: today,
	};
	QnAWrite.updateOne({
		subject: req.body.oldsubject,
	}, {
		subject: req.body.subject,
		content: req.body.content,
		writer: req.body.writer,
	})
	.then((notice) => {
		if (!notice) {
			QnAWrite.create(userData)
					.then((noticer) => {
						res.json({ status: "write success" });
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

// 개인정보 수정 처리
users.post("/modp", (req, res) => {
	const userData = {
		/*voteImage: req.body.voteImage,*/
	};
	User.updateOne({
		email: req.body.email,
	}, {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		sex: req.body.sex,
		age: req.body.age,
		location: req.body.location,
	})
	.then((notice) => {
		if (!notice) {
			Write.create(userData)
					.then((noticer) => {
						res.json({ status: "write success" });
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

// 목록 가져오는 처리
users.get("/getlist", (req, res) => {
	Write.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});

// QnA 목록 가져오는 처리
users.get("/getqnalist", (req, res) => {
	QnAWrite.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});


// 프로필 정보 가져오는 처리
users.get("/getprofile", (req, res) => {
	User.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});

// 글 삭제하는 처리
users.post("/del", (req, res) => {
	const userData = {
		_id: req.body._id,
	};

	Write.deleteOne({
		_id: req.body._id,
	})
		.then((notice) => {
				if (!notice) {
					Write.create(userData)
							.then((noticer) => {
								res.json({ status: "delete success" });
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

// QnA 글 삭제하는 처리
users.post("/qnadel", (req, res) => {
	const userData = {
		_id: req.body._id,
	};

	QnAWrite.deleteOne({
		_id: req.body._id,
	})
		.then((notice) => {
				if (!notice) {
					QnAWrite.create(userData)
							.then((noticer) => {
								res.json({ status: "delete success" });
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

// 회원가입 하는 처리
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

// 기업회원 가입하는 처리
users.post("/registercomp", (req, res) => {
	const today = new Date();
	const userData = {
		compName: req.body.compName,
		compNum: req.body.compNum,
		email: req.body.email,
		password: req.body.password,
		
		created: today,
	};

	Usercomp.findOne({
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

// 투표 개설 신청하는 처리
users.post("/makevote", (req, res) => {
	const today = new Date();
	const userData = {
		
		voteName: req.body.voteName,
		voteCode: req.body.voteCode,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		candidates: req.body.candidates,
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

// 로그인 처리
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

// 기업회원 로그인 처리
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

// 투표결과 처리
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

// 유저목록 가져오는 처리
users.get("/userlist", (req, res) => {
	User.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});

// 기업회원 목록 가져오는 처리
users.get("/userlistcomp", (req, res) => {
	Usercomp.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});

// 투표목록 가져오는 처리
users.get("/votelist", (req, res) => {
	Vote.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});

// 투표목록 가져오는 처리
users.get("/endvotelist", (req, res) => {
	EndVote.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});

// 투표결과 가져오는 처리
users.get("/voteresult", (req, res) => {
	VoteResult.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.send("error: " + err);
		});
});

module.exports = users;
