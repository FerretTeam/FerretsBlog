var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

// 定义凭证模式
const passportSchema = new mongoose.Schema({
  username: String,
  encryptedPassword: String
});

// 定义凭证模型
const Passport = mongoose.model('Passport', passportSchema);

// 认证模块
router = require('./auth')(router, Passport);
// 用户模块
router = require('./user')(router, Passport);

module.exports = router;
