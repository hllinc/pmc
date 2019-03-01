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
router.get('/getCurrentUserResources', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  Object.assign(ret, resultData, {
    code: "ok",
    result: [{
      id: 1,
      name: '首页',
      routerLink: 'home',
      routerLinkActive: 'ant-menu-item-selected',
      icon: 'home',
      children: []
    }, {
      id: 2,
      name: '系统管理',
      routerLink: 'sys',
      routerLinkActive: 'ant-menu-item-selected',
      icon: 'setting',
      children: [{
        id: 21,
        name: '组织架构',
        routerLink: './sys/org',
        routerLinkActive: 'ant-menu-item-selected',
        icon: 'table',
        children: []
      }, {
        id: 22,
        name: '用户管理',
        routerLink: './sys/user',
        routerLinkActive: 'ant-menu-item-selected',
        icon: 'team',
        children: []
      }, {
        id: 23,
        name: '角色管理',
        routerLink: './sys/role',
        routerLinkActive: 'ant-menu-item-selected',
        icon: 'user',
        children: []
      }, {
        id: 24,
        name: '资源管理',
        routerLink: './sys/resource',
        routerLinkActive: 'ant-menu-item-selected',
        icon: 'bars',
        children: []
      }]
    }],
    info: '获取资源数据成功！'
  });

  res.send(ret);
});

module.exports = router;
