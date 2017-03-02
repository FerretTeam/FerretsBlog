const mongoose = require('mongoose');

module.exports = function(router, Passport, User) {
  // 校验凭证是否合法
  checkPassport = function(passport, callback) {
    Passport.find({username: passport.username,
                   encryptedPassword: passport.encryptedPassword}, function(err, passport_) {
      if (err) {
        console.error(err);
        callback('出现异常，请联系管理员');
        return;
      }
      if (passport_.length != 1) callback('用户不存在或密码错误');
      else callback('true');
    });
  }

  // 获取用户
  router.post('/get-user', (req, res) => {
    checkPassport(req.body, function(data) {
      if (data == 'true') {
        // TODO 获取用户信息
        res.json('haha');
      } else {
        // 返回报错信息
        res.json(data);
      }
    });
  });

  return router;
}
