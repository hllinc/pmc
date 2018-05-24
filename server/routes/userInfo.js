'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {resultData} = require('../common/utils');
/**
 * 获取当前用户信息
 */
router.get('/baseInfo', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  Object.assign(ret, resultData, {
    success: true,
    data: {
      id: '1',// 系统唯一标识
      account: '1',// 用户id
      tenantId: '1',// 租户id
      userName: 'hllinc',// 用户名
      userType: 'tenant',// 用户类型
      avatarUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',// 头像路径
      registerDate: '2018-05-20',// 注册时间
      phone: '18265343342',// 手机号
      companyName: '测试公司名称',// 公司名称
      industryName: '测试主要行业',// 主要行业
      mainBusiness: '测试主营业务',// 主营业务
      provinceId: '1',// 省id
      cityId: '11',// 市id
      addressStreet: '测试街道地址',// 街道地址
      contactPhone: '13624232423',// 联系电话
      zipCode: '100024'// 邮编
    },
    message: '获取数据成功！'
  });

  res.send(ret);
});

/**
 * 保存当前用户信息
 */
router.post('/saveBaseInfo', function (req, res) {
  res.type('json');
  let ret = {};
  Object.assign(ret, resultData, {
    success: true,
    data: {
      userId: '1',// 用户id
      tenantId: '1',// 租户id
      userName: 'hllinc',// 用户名
      avatarUrl: '',// 头像路径
      registerDate: '2018-05-20',// 注册时间
      phone: '18265343342',// 手机号
      companyName: '测试公司名称',// 公司名称
      industryName: '测试主要行业',// 主要行业
      mainBusiness: '测试主营业务',// 主营业务
      provinceId: '1',// 省id
      cityId: '11',// 市id
      addressStreet: '测试街道地址',// 街道地址
      contactPhone: '13624232423',// 联系电话
      zipCode: '100024'// 邮编
    },
    message: '保存数据成功！'
  });

  res.send(ret);
});

/**
 * 获取省列表
 */
router.post('/getProvinceList', function (req, res) {
  res.type('json');
  let ret = {};
  Object.assign(ret, resultData, {
    success: true,
    data: [{
      id: '1',
      provinceName: '北京'
    }, {
      id: '2',
      provinceName: '安徽'
    }],
    message: '获取数据成功！'
  });

  res.send(ret);
});

/**
 * 获取城市列表
 */
router.post('/getCityList', function (req, res) {
  res.type('json');
  let params = req.body,
    ret = {};

  const resultData = {
    1: [{
      id: '11',
      cityName: '北京市'
    }],
    2: [{
      id: '21',
      cityName: '合肥市'
    }, {
      id: '22',
      cityName: '淮南市'
    }]
  };

  Object.assign(ret, resultData, {
    success: true,
    data: resultData[params.id],
    message: '获取数据成功！'
  });

  res.send(ret);
});

module.exports = router;
