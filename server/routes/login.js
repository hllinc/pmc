'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {resultData} = require('../common/utils');

/**
 * 登录
 */
router.post('/login', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  if (params.username === 'linc' && params.password === '123456') {
    Object.assign(ret, resultData, {
      code: 'ok',
      info: '登录成功'
    });
  } else {
    Object.assign(ret, resultData, {
      code: 'error',
      info: '用户名或密码不正确'
    });
  }

  res.send(ret);
});
/**
 * 安全退出
 */
router.post('/logout', function (req, res) {
  res.type('json');
  let ret = {};
  Object.assign(ret, resultData, {
    code: 'ok',
    info: '退出成功'
  });

  res.send(ret);
});

/**
 * 获取验证码
 */
router.post('/getImageValidatorCode', function(req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  Object.assign(ret, resultData, {
    "data": {
      "imageUrl": "/src/web/images/imgCode.png",
      "picCode": "aeck"
    },
    "errorCode": null,
    "message": 'null',
    "success": true
  });
  res.send(ret);
});

module.exports = router;
