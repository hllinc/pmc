/**
 * Created by hllinc on 2018/5/24.
 */

'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {resultData} = require('../../common/utils');

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
router.get('/logout', function (req, res) {
  res.type('json');
  let ret = {};
  Object.assign(ret, resultData, {
    code: 'ok',
    info: '退出成功'
  });

  res.send(ret);
});

/**
 * 获取当前用户信息
 */
router.get('/getCurrentUser', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  Object.assign(ret, resultData, {
    code: "ok",
    result: {
      id: '1',
      username: 'Hllinc',
      email: 'hllinc@163.com'
    },
    info: '获取数据成功！'
  });

  res.send(ret);
});

/**
 * 获取用户列表
 */
router.get('/selectPage', function (req, res) {
  const id = req.query.id;
  res.type('json');
  let params = req.body,
    ret = {};

  loadFile('/mock/org.json', function (data) {
    let result = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i]['subSystemId'] === id) {
        result.push(data[i]);
      }
    }
    Object.assign(ret, resultData, {
      code: "ok",
      result: result,
      info: '获取数据成功！'
    });

    res.send(ret);
  });
});

module.exports = router;
