'use strict';
const express = require('express');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// 设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == "OPTIONS") res.sendStatus(200);
  else next();
});

app.all('/oauth/token', function(req,res,next){
  res.type('json');
  let params = req.body,
    ret = {};
  if (params.username === 'linc' && params.password === '123456') {
    Object.assign(ret, resultData, {
      code: 'ok',
      access_token: 'mock_token',
      info: '登录成功'
    });
  } else {
    Object.assign(ret, resultData, {
      code: 'error',
      error: '用户名或密码不正确'
    });
  }

  res.send(ret);
});


// 用户
const user = require('./routes/sys/user');
app.use('/sys/user', user);

// 子系统
const subSystem = require('./routes/sys/subSystem');
app.use('/sys/subSystem', subSystem);

// 组织机构
const org = require('./routes/sys/org');
app.use('/sys/org', org);

// 资源
const resource = require('./routes/sys/resource');
app.use('/sys/resource', resource);

const { resultData } = require('./common/utils');

app.get('/', function(req, res) {
  res.redirect('/index');
});

app.get('/index', function(req, res) {
  res.type('json');
  let ret = {};

  Object.assign(ret, resultData, {
    result: null,
    info: 'This url has no data!'
  });
  res.send(ret);
});

let server = app.listen(8089, function() {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
