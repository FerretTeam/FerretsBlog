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

// 定义用户模式
const userSchema = new mongoose.Schema({
  id: Number,
  // 基本信息
  username: String,
  email: String,
  userAvatarUrl: String,
  // 成就
  totalCharacters: String,  // 为了排版便利，在 service 中将大数转换为 k 或 m
  totalReading: String,
  totalLikes: String,
  // 详细信息
  introduction: String,
  field: String
});
// 定义用户模型
const User = mongoose.model('User', userSchema);

// 认证模块
router = require('./auth')(router, Passport, User);
// 用户模块
router = require('./user')(router, Passport, User);

module.exports = router;
