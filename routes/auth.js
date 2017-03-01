const mongoose = require('mongoose');

module.exports = function(router, Passport) {
  // 后端校验
  authValidator = function(passport) {
    // 从凭证中取出数据
    var username = passport.username;
    var password = passport.encryptedPassword;
    var errorMessage = '';

    // 定义校验规则
    let usernameRegex = /^[a-zA-Z0-9]+$/;
    let passwordRegex = /^[a-f0-9]{32}$/;

    // 对用户名进行校验
    if (username == null || username == undefined || username == '')
      errorMessage = '用户名不能为空';
    else if (username.length < 5 || username.length > 10)
      errorMessage = '用户名长度需在 5 到 10 之间';
    else if (username.match(usernameRegex) == null)
      errorMessage = '用户名只能由字母和数字组成';

    // 对密码进行校验
    else if (password.match(passwordRegex) == null)
      errorMessage = '密码不符合哈希后值的格式';

    return errorMessage;
  }

  // 登录
  router.post('/sign-in', (req, res) => {
    // 创建新的凭证
    var passport = new Passport({
      username: req.body.username,
      encryptedPassword: req.body.encryptedPassword
    });
    // 进行后端校验
    var errorMessage = authValidator(passport);
    if (errorMessage != '')
      res.json(errorMessage);
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
    // 进行后端校验
    var errorMessage = authValidator(passport);
    if (errorMessage != '')
      res.json(errorMessage);
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

  return router;
}
