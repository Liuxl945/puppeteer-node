/*
 * @Author: your name
 * @Date: 2020-11-26 09:41:52
 * @LastEditTime: 2020-11-26 11:32:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \server\start.js
 */
require("babel-polyfill")
require('babel-register')({
    presets: ['env']
})
module.exports = require('./index-router.js')
// module.exports = require('./index-crawl.js')