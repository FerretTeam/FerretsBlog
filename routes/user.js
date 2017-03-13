module.exports = function(router, Passport, User) {
  // 校验凭证是否合法
  checkPassport = function(passport, callback) {
    Passport.find({username: passport.username,
                   encryptedPassword: passport.encryptedPassword}, function(err, passport_) {
      if (err) {
        console.error(err);
        callback('错误 005：出现异常，请联系管理员');
        return;
      }
      if (passport_.length != 1) callback('用户不存在或密码错误');
      else callback('true');
    });
  }

  // 校验用户信息是否合法
  checkUserInfo = function(image, email) {
    var errorMessage = '';

    // 定义校验规则
    let imageRegex = /^(?:data:image\/([a-zA-Z]*);base64,)?(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
    let emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // 对图片进行校验
    if (image == null || image == undefined || image == '')  // 防止为空的恶意攻击
      errorMessage = '图片不符合格式规范';
    else if (String(image).match(imageRegex) == null && String(image) != '/assets/images/default-avatar.jpg')
      errorMessage = '图片不符合格式规范';

    // 对邮箱进行校验
    else if (email == null || email == undefined || email == '')  // 防止为空的恶意攻击
      errorMessage = '邮箱不符合格式规范';
    else if (String(email).match(emailRegex) == null)
      errorMessage = '邮箱不符合格式规范';

    return errorMessage;
  }

  // 获取用户
  router.post('/get-user', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    }
    // 验证证书
    checkPassport(req.body, function(data) {
      if (data == 'true') {
        User.find({username: req.body.username}, function(err, user_) {
          if (err) {
            console.error(err);
            return res.json('错误 006：出现异常，请联系管理员');
          }
          if (user_.length != 1) return res.json('错误 007：出现异常，请联系管理员');
          else return res.json(user_[0]);
        });
      } else {
        // 返回报错信息
        return res.json(data);
      }
    });
  });

  // 更新用户
  router.post('/update-user', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    } else if (req.body.passport == null || req.body.passport == undefined) {
      return res.json('INVALID_REQUEST');
    }
    // 各项校验
    var errorMessage = checkUserInfo(req.body.userAvatarUrl, req.body.email);
    if (errorMessage != '') return res.json(errorMessage);
    // 验证证书
    checkPassport(req.body.passport, function(data) {
      if (data == 'true') {
        User.find({username: req.body.passport.username}, function(err, user_) {
          if (err) {
            console.error(err);
            return res.json('错误 008：出现异常，请联系管理员');
          }
          if (user_.length != 1) {
            return res.json('错误 009：出现异常，请联系管理员');
          } else {
            User.findByIdAndUpdate(user_[0]._id, {$set: {
              userAvatarUrl: String(req.body.userAvatarUrl),
              email: String(req.body.email),
              introduction: String(req.body.introduction),
              field: String(req.body.field)
            }}, {new: true}, function(err, user__) {
              if (err) {
                console.error(err);
                return res.json('错误 010：出现异常，请联系管理员');
              }
              return res.json(user__);
            });
          }
        });
      } else {
        // 返回报错信息
        return res.json(data);
      }
    });
  });

  // TODO 更新用户的点赞数
  // post username

  return router;
}
