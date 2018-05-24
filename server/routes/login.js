'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {resultData} = require('../common/utils');

/**
 * 登录
 */
router.post('/saaslogin', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  if (params.account === 'linc' && params.password === '123456') {
    Object.assign(ret, resultData, {
      success: true,
      message: '登录成功',
      data: null
    });
  } else {
    Object.assign(ret, resultData, {
      success: false,
      message: '用户名或密码不正确',
      data: null
    });
  }
  
  res.send(ret);
});

/**
 * 获取验证码
 */
router.post('/captcha/img', function(req, res) {
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