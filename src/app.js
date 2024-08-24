require("dotenv").config();
require('module-alias/register');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session")
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const passport = require("passport");
const passportLocal = require("passport-local");
//
const userServices = require("./services/api/v1/auth/user.services")
//



//
const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httOnly: true,
    maxAge: 5 * 60 * 1000
  }
}))
// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
passport.use("local", passportLocal);
passport.serializeUser(function (user, done) {
  done(null, user.id); //Lưu user.id vào session
});

passport.deserializeUser(async function (id, done) {
  const user = await userServices.getUsers(id) //Truy vấn tới database để trả về thông tin user
  done(null, user);
});
//
const authRouter = require("./routes/api/v1/auth/authRouter.js")


//Route
app.use('/', indexRouter);
app.use('/users', usersRouter);
authRouter(app);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
