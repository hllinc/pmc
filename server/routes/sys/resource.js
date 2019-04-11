/**
 * Created by hllinc on 2018/7/17.
 */

'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {resultData} = require('../../common/utils');
/**
 * 获取当前用户资源信息
 */
router.get('/getCurrentUseres', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  Object.assign(ret, resultData, [{
      id: 1,
      name: '首页',
      url: 'home',
      icon: 'home',
      children: []
    }, {
      id: 2,
      name: '系统管理',
      url: 'sys',
      icon: 'setting',
      children: [{
        id: 20,
        name: '子系统',
        url: './sys/sub-system',
        icon: 'cluster',
        children: []
      }, {
        id: 21,
        name: '组织架构',
        url: './sys/org',
        icon: 'table',
        children: []
      }, {
        id: 22,
        name: '用户管理',
        url: './sys/user',
        icon: 'team',
        children: []
      }, {
        id: 23,
        name: '角色管理',
        url: './sys/role',
        icon: 'user',
        children: []
      }, {
        id: 24,
        name: '资源管理',
        url: './sys/resource',
        icon: 'bars',
        children: []
      }]
    }]);

  res.send(ret);
});

module.exports = router;
