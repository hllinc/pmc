/**
 * Created by hllinc on 2018/5/29.
 */

'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {resultData, loadFile} = require('../../common/utils');
/**
 * 根据子系统id获取根节点
 */
router.get('/getOrgDataBySubSystemId', function (req, res) {
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

/**
 * 根据父节点获取下级节点
 */
router.get('/getOrgByParentId', function (req, res) {
  const pid = req.query.parentId;
  res.type('json');
  let params = req.body,
    ret = {};

  loadFile('/mock/org.json', function (data) {
    let result = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i]['parentId'] === pid) {
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

/**
 * 添加
 */
router.post('/add', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  Object.assign(ret, resultData, {
    code: "ok",
    result: new Date().getTime(),
    info: '添加成功！'
  });

  res.send(ret);
});

/**
 * 修改
 */
router.post('/update', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  Object.assign(ret, resultData, {
    code: "ok",
    result: new Date().getTime(),
    info: '修改成功！'
  });

  res.send(ret);
});

/**
 * 删除
 */
router.get('/delete', function (req, res) {
  const id = req.query.id;
  res.type('json');
  let params = req.body,
    ret = {};
  Object.assign(ret, resultData, {
    code: "ok",
    result: new Date().getTime(),
    info: '删除成功！'
  });

  res.send(ret);
});

module.exports = router;
