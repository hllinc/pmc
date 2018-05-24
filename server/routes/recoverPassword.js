'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { resultData } = require('../common/utils');

router.post('/validateAccount', function (req, res) {
  let validatedAccountArr = ['linc001', 'admin001', 'test001'];
  res.type('json');
  let params = req.body,
    ret = {};
  let account = params.account;
  if(validatedAccountArr.indexOf(account) != -1){
    Object.assign(ret, resultData, {
      success: true,
      message: '有效用户名'
    });
  }else{
    Object.assign(ret, resultData, {
      success: false,
      message: '手机号/用户名不存在！'
    });
  }
  
  res.send(ret);
});
/**
 * 确认用户
 */
router.post('/confirmUser', function (req, res) {
  let validatedAccountArr = ['linc001', 'admin001', 'test001'];
  res.type('json');
  let params = req.body,
    ret = {};
  let account = params.account;
  if(validatedAccountArr.indexOf(account) != -1){
    Object.assign(ret, resultData, {
      success: true,
      message: '有效用户名',
      data:{
        account: 'linc001',
        phone: '182****4231',
        userType: 4
      }
    });
  }else{
    Object.assign(ret, resultData, {
      success: false,
      message: '手机号/用户名不存在！'
    });
  }
  
  res.send(ret);
});

/**
 * 重置密码
 */
router.post('/resetPwd', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  let account = params.account;
  Object.assign(ret, resultData, {
    success: true,
    message: '密码重置成功！'
  });
  res.send(ret);
});
module.exports = router;