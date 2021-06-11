var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(cors({
  //允许所有前端域名
  "origin": ["http://localhost:8001", "http://localhost:5000", "http://127.0.0.1:8848"],
  "credentials": true,//允许携带凭证
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //被允许的提交方式
  "allowedHeaders": ['Content-Type', 'Authorization', 'token']//被允许的post方式的请求头
}));

app.use('/', express.static(path.join(__dirname, '/public')));


try {
  app.use("/routs/ags", require("./routes/ags"))
  app.use("/routs/login", require("./routes/login"))
  app.use("/routs/yanzheng", require("./routes/yanzheng"))
  app.use("/routs/goods", require("./routes/goods"))
  // catch 404 and forward to error handler
  app.use("/routs/user",require("./routes/ubdata"))
  app.use(function (req, res, next) {

    next(createError(404));
  });



  app.use(function (err, req, res, next) {
    console.log('sendFile')
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);

    if (req.url.includes('/api')) {// 用户端接口不存在 返回  {err:1,msg:'不存在的接口'}
      res.send({ err: 1, msg: '不存在的接口' })
    } else if (req.url.includes('/admin')) {// 管理端接口不存在 返回  res.render('error.ejs')
      res.render('error');
    } else { // 资源托管没有对应的页面 返回 404.html

      res.sendFile(path.join(__dirname, 'public', 'index.html'))
    }


  });
  module.exports = app;
} catch (error) {
  console.log(error)
}

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// error handler




