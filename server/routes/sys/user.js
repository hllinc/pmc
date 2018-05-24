/**
 * Created by hllinc on 2018/5/24.
 */

'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {resultData} = require('../../common/utils');
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

module.exports = router;
