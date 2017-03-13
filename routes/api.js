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

// 定义文章
const articleSchma = new mongoose.Schema({
  author: mongoose.Schema.ObjectId,  // 用户凭证的 _id
  date: Date,
  image: String,
  title: String,
  synopsis: String,
  tagName: [String],
  contents: String,
  likes: Number,
  characters: Number
});
const Article = mongoose.model('Article', articleSchma);

// 定义评论
const commentSchema = new mongoose.Schema({
  article: mongoose.Schema.ObjectId,  // 文章的 _id
  username: String,
  userAvatarUrl: String,
  message: String,
  time: Date,
  likes: Number
});
const Comments = mongoose.model('Comment', commentSchema);

// 认证模块
router = require('./auth')(router, Passport, User);
// 用户模块
router = require('./user')(router, Passport, User);
// 文章模块
router = require('./article')(router, Passport, Article, Comments, User);
// 评论模块
router = require('./comments')(router, Passport, Article, Comments, User);

module.exports = router;
