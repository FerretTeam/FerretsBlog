module.exports = function(router, Passport, User) {
  // 后端校验
  authValidator = function(username, email, password) {
    var errorMessage = '';

    // 定义校验规则
    let usernameRegex = /^[a-zA-Z0-9]+$/;
    let passwordRegex = /^[a-f0-9]{32}$/;
    let emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // 对用户名进行校验
    if (username == null || username == undefined || username == '')
      errorMessage = '用户名不能为空';
    else if (username.length < 5 || username.length > 10)
      errorMessage = '用户名长度需在 5 到 10 之间';
    else if (String(username).match(usernameRegex) == null)
      errorMessage = '用户名只能由字母和数字组成';

    // 对邮箱进行校验
    else if (email == null || email == undefined || email == '')  // 防止为空的恶意攻击
      errorMessage = '邮箱不符合格式规范';
    else if (String(email).match(emailRegex) == null)
      errorMessage = '邮箱不符合格式规范';

    // 对密码进行校验
    else if (password == null || password == undefined || password == '')  // 防止为空的恶意攻击
      errorMessage = '密码不符合哈希后值的格式';
    else if (String(password).match(passwordRegex) == null)
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
    var errorMessage = authValidator(passport.username, '0_0@liuren.link', passport.encryptedPassword);
    if (errorMessage != '')
      return res.json(String(errorMessage));
    // 在数据库中进行比对，若匹配则用户登录成功
    Passport.find({username: passport.username,
                   encryptedPassword: passport.encryptedPassword}, function(err, passport_) {
      if (err) {
        console.error(err);
        return res.json('错误 001：出现异常，请联系管理员');
      }
      if (passport_.length != 1) return res.json('用户不存在或密码错误');
      else return res.json('true');
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
    var errorMessage = authValidator(passport.username, req.body.email, passport.encryptedPassword);
    if (errorMessage != '')
      return res.json(String(errorMessage));
    // 在数据库中比对，确保没有重名用户
    Passport.find({username: passport.username}, function(err, passport_) {
      if (err) {
        console.error(err);
        return res.json('错误 002：出现异常，请联系管理员');
      }
      if (passport_.length >= 1) {
        return res.json('该用户名已存在，请尝试其他其他用户名');
      } else {
        passport.save(function(err, passport) {
          if (err) return res.json('错误 003：出现异常，请联系管理员');
          // 创建新的用户
          var user = new User({
            username: req.body.username,
            email: req.body.email,
            userAvatarUrl: '/assets/images/default-avatar.jpg',
            totalCharacters: 0,
            totalReading: 0,
            totalLikes: 0,
            introduction: '',
            field: ''
          });
          user.save(function(err, user) {
            if (err) return res.json('错误 004：出现异常，请联系管理员');
            return res.json('true');
          });
        });
      }
    });
  });

  return router;
}
