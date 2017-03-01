const mongoose = require('mongoose');

module.exports = function(router, Passport) {
  // 定义模式
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

  // 定义模型
  const User = mongoose.model('User', userSchema);

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

  // 后端校验
  userValidator = function(username, email) {
    var errorMessage = '';
    username = String(username);
    email = String(email);

    // 定义校验规则
    let usernameRegex = /^[a-zA-Z0-9]+$/;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // 对用户名进行校验
    if (username == null || username == undefined || username == '')
      errorMessage = '用户名不能为空';
    else if (username.length < 5 || username.length > 10)
      errorMessage = '用户名长度需在 5 到 10 之间';
    else if (username.match(usernameRegex) == null)
      errorMessage = '用户名只能由字母和数字组成';

    // 对邮箱进行校验
    else if (email.match(emailRegex) == null)
      errorMessage = '邮箱不符合格式规范';

    return errorMessage;
  }

  // 新建用户
  router.post('/create-user', (req, res) => {
    checkPassport(JSON.parse(req.body.passport), function(data) {
      if (data == 'true') {
        // 后端校验
        var errorMessage = userValidator(req.body.username, req.body.email);
        if (errorMessage != '')
          res.json(errorMessage);

        // 创建新的用户
        var user = new User({
          id: 0,
          username: req.body.username,
          email: req.body.email,
          userAvatarUrl: '/assets/images/default-avatar.jpg',
          totalCharacters: '0',
          totalReading: '0',
          totalLikes: '0',
          introduction: '',
          field: ''
        });
        user.save(function(err, user) {
          if (err) return res.json('出现异常，请联系管理员');
          res.json(user);
        });
      } else {
        // 返回报错信息
        res.json(data);
      }
    });
  });

  return router;
}
