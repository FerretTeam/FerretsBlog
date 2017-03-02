const mongoose = require('mongoose');

module.exports = function(router, Passport, User) {
  // 校验凭证是否合法
  checkPassport = function(passport, callback) {
    Passport.find({username: passport.username,
                   encryptedPassword: passport.encryptedPassword}, function(err, passport_) {
      if (err) {
        console.error(err);
        callback('出现异常，请联系管理员：005');
        return;
      }
      if (passport_.length != 1) callback('用户不存在或密码错误');
      else callback('true');
    });
  }

  // 获取用户
  router.post('/get-user', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    } else if (req.body.username == null || req.body.username == undefined ||
               req.body.encryptedPassword == null || req.body.encryptedPassword == undefined) {
      return res.json('INVALID_REQUEST');
    }
    // 验证证书
    checkPassport(req.body, function(data) {
      if (data == 'true') {
        User.find({username: req.body.username}, function(err, user_) {
          if (err) {
            console.error(err);
            callback('出现异常，请联系管理员：006');
            return;
          }
          if (user_.length != 1) return res.json('出现异常，请联系管理员：007');
          else return res.json(user_[0]);
        });
      } else {
        // 返回报错信息
        return res.json(data);
      }
    });
  });

  return router;
}
