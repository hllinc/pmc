'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { resultData } = require('../common/utils');
/**
 * 验证帐号的有效性
 */
router.post('/validateAccount', function (req, res) {
  let validatedAccountArr = ['linc001', 'admin001', 'test001'];
  res.type('json');
  let params = req.body,
    ret = {};
  let account = params.account;
  if(validatedAccountArr.indexOf(account) != -1){
    Object.assign(ret, resultData, {
      success: true,
      message: '该帐号已存在'
    });
  }else{
    Object.assign(ret, resultData, {
      success: false,
      message: '有效用户名'
    });
  }
  
  res.send(ret);
});

/**
 * 获取手机验证码
 */
router.post('/captcha/sms', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  Object.assign(ret, resultData, {
    success: true,
    message: '123456'
  });
  res.send(ret);
});
/**
 * 注册帐号
 */
router.post('/register', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  Object.assign(ret, resultData, {
    success: true,
    message: '注册成功！'
  });
  res.send(ret);
});
module.exports = router;