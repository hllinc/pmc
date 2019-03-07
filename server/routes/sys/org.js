/**
 * Created by hllinc on 2018/5/29.
 */

'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {resultData, loadJSONFile} = require('../../common/utils');
/**
 * 获取当前用户信息
 */
router.get('/getOrgDataBySubSystemId', function (req, res) {
  const id = req.query.id;
  res.type('json');
  let params = req.body,
    ret = {};

  loadJSONFile('/mock/org.json', function (data) {
    let resultData = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i]['subSystemId'] === id) {
        resultData.push(data[i]);
      }
    }
    Object.assign(ret, resultData, {
      code: "ok",
      result: resultData,
      info: '获取数据成功！'
    });

    res.send(ret);
  });
});

module.exports = router;
