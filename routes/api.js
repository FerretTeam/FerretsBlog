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
  Passport.find({username: passport.username,
                 encryptedPassword: passport.encryptedPassword}, function(err, passport_) {
    if (err) {
      console.error(err);
      res.json('出现异常，请联系管理员');
    }
    if (passport_.length != 1) res.json('用户不存在或密码错误');
    else res.json('true');
  });
});

// 注册
router.post('/sign-up', (req, res) => {
  // 创建新的凭证
  var passport = new Passport({
    username: req.body.username,
    encryptedPassword: req.body.encryptedPassword
  });
  // 在数据库中比对，确保没有重名用户
  Passport.find({username: passport.username}, function(err, passport_) {
    if (err) {
      console.error(err);
      res.json('出现异常，请联系管理员');
    }
    if (passport_.length >= 1) {
      res.json('该用户名已存在，请尝试其他其他用户名');
    } else {
      passport.save(function(err, passport) {
        if (err) return res.json('出现异常，请联系管理员');
        res.json('true');
      });
    }
  });
});

module.exports = router;
