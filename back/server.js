var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var port = process.env.PORT || 5000;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 404 에러 처리 관련
const history = require('connect-history-api-fallback');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 404 에러 처리 관련
app.use('/api', require('./routes/api'));
app.use(history());
app.use(express.static(path.join(__dirname, '../', 'fe', 'dist')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//const dbURI = "mongodb+srv://admin:adminonly@cluster0.rmwim.mongodb.net/users_db?retryWrites=true&w=majority";
const dbURI = "mongodb+srv://admin:adminonly@cluster0.ciabk.mongodb.net/users_db?retryWrites=true&w=majority";
//
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		app.listen(port, function () {
			console.log("Server: " + port);
			console.log("Database: MongoDB");
		});
	})
	.catch((err) => {
		console.log(err);
	});

var Users = require("./routes/Users");

app.use("/users", Users);

module.exports = app;
