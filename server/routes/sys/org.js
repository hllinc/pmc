/**
 * Created by hllinc on 2018/5/29.
 */

'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {resultData} = require('../../common/utils');
/**
 * 获取当前用户信息
 */
router.get('/getOrgRoot', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  Object.assign(ret, resultData, {
    code: "ok",
    result: {
      id: '1',
      name: '组织机构',
      expanded: 'hllinc@163.com'
    },
    info: '获取数据成功！'
  });

  res.send(ret);
});

module.exports = router;
