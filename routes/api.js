const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

// 定义模式
const passportSchema = new mongoose.Schema({
  username: String,
  encryptedPassword: String
});

// 定义模型
const Passport = mongoose.model('Passport', passportSchema);

// 登录
router.post('/sign-in', (req, res) => {
  // 创建新的凭证
  var passport = new Passport({
    username: req.body.username,
    encryptedPassword: req.body.encryptedPassword
  });
  // 在数据库中进行比对，若匹配则用户登录成功
  Passport.find(passport, function(err, passport_) {
    if (err) {
      console.error(err);
      res.json('false');
    }
    if (passport_.length != 1) res.json(false);
    else res.json('true');
  });
});

// 注册
router.post('/sign-up', (req, res) => {
  console.log(req.body);
  res.json('true');
});

module.exports = router;
