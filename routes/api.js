var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

// 定义凭证
const passportSchema = new mongoose.Schema({
  username: String,
  encryptedPassword: String
});
const Passport = mongoose.model('Passport', passportSchema);

// 定义用户
const userSchema = new mongoose.Schema({
  // 基本信息
  username: String,
  email: String,
  userAvatarUrl: String,
  // 成就
  totalCharacters: Number,
  totalReading: Number,
  totalLikes: Number,
  // 详细信息
  introduction: String,
  field: String
});
const User = mongoose.model('User', userSchema);

// 认证模块
router = require('./auth')(router, Passport, User);
// 用户模块
router = require('./user')(router, Passport, User);

module.exports = router;
