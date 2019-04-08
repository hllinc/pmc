/**
 * Created by hllinc on 2019/03/05.
 */

'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {resultData} = require('../../common/utils');
/**
 * 获取子系统列表
 */
router.get('/selectPage', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  Object.assign(ret, resultData, {
    code: "ok",
    result: [{
      id: 1,
      name: '子系统1',
      info: '描述信息',
      url: 'http://system1.com',
      createdTime: '',
      modifiedTime: '',
      operatorId: 1
    }, {
      id: 2,
      name: '子系统2',
      info: '描述信息2',
      url: 'http://system2.com',
      createdTime: '',
      modifiedTime: '',
      operatorId: 1
    }],
    info: '获取数据成功！'
  });

  res.send(ret);
});

/**
 * 添加
 */
router.post('/add', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  Object.assign(ret, resultData, {
    code: "ok",
    result: null,
    info: '添加成功！'
  });

  res.send(ret);
});

/**
 * 编辑
 */
router.post('/modify', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  Object.assign(ret, resultData, {
    code: "ok",
    result: null,
    info: '修改成功！'
  });

  res.send(ret);
});

/**
 * 删除
 */
router.post('/delete', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  Object.assign(ret, resultData, {
    code: "ok",
    result: null,
    info: '删除成功！'
  });

  res.send(ret);
});

module.exports = router;
