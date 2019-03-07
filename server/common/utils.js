'use strict';
var fs = require('fs');  //fs是读取文件的模板工具
/**
 * 读取json文件
 * @param url
 * @param callback
 */
function loadFile(url, callback) {
  fs.readFile(__dirname + url, function (err, data) {//读取同目录下的book.json文件
    if (err) {
      throw err;
    }
    var jsonObj = JSON.parse(data);//获取json文件对象
    callback(jsonObj);
  });
}

const resultData = {
  code: 'ok', //状态码
  info: null, //提示信息
  result: null //返回数据，可以是任意结构
};

module.exports = {
  resultData,
  loadFile
};
