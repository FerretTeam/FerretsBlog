module.exports = function(router, Passport, Article, Comments, User) {
  // 通过作者名和文章标题查找文章的 _id
  findArticleId = function(authorname, title, callback) {
    Passport.find({username: authorname}, function(err, passport_) {
      if (err)
        return callback('error');
      if (passport_.length != 1)
        return callback('error2');
      Article.find({author: passport_[0]._id, title: title}, function(err, article_) {
        if (err)
          return callback('error');
        if (article_.length != 1)
          return callback('error2');
        else
          return callback(article_[0]._id);
      });
    });
  }

  // 通过文章的作者和标题返回评论
  // post username & title
  router.post('/get-comments', (req, res) =>{
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    }

    // 查找文章的id
    findArticleId(req.body.authorname, req.body.title, function(data) {
      if (data == 'error2') {
        return res.json('无法找到该文章');
      } else if (data == 'error') {
        return res.json('错误 032：出现异常，请联系管理员');
      } else {
        Comments.find({article: data}, null, {sort: {likes: -1}}, function(err, comments){
            if (err) {
              return res.json('错误 033：出现异常，请联系管理员');
            } else {
              let tempComments = comments;
              outLoop(tempComments, res);
              return res.json(tempComments);
            }
        });
      }
    });
  });

  function outLoop(tempComments, res) {
    for (var i = 0; i < tempComments.length; i++) {
      (function(i) { User.find({username: tempComments[i].username}, function(err, user){
        if (err) {
          return res.json('错误 034：出现异常，请联系管理员');
        } else {
          if (user.length != 1) return res.json('该用户不存在');
          tempComments[i].userAvatarUrl = user[0].userAvatarUrl;
          return ;
        }
      });
    })(i);
    }
    return tempComments;
  }

  // 通过文章的作者、标题以及评论者的信息添加评论
  // post authorname & title & comment
  router.post('/add-comment', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    } else if (req.body.comment == null || req.body.comment == undefined ||
               req.body.passport == null || req.body.passport == undefined) {
      return res.json('INVALID_REQUEST');
    }

    if (req.body.comment.message == '') return res.json('该评论为空');

    // 查找文章的id
    findArticleId(req.body.authorname, req.body.title, function(data) {
      if (data == 'empty') {
        return res.json('无法找到相应文章');
      } else if ( data == 'error') {
        return res.json('错误 035：出现异常，请联系管理员');
      } else {
        // 判断评论的合法性，包括验证评论者的凭证
        Passport.find({username: req.body.passport.username,
                       encryptedPassword: req.body.passport.encryptedPassword},
                       function(err, passport_) {
          if (err) {
           return res.json('错误 036：出现异常，请联系管理员');
          } else {
            if (passport_.length != 1) return res.json('无评论权限');
            // 通过评论者的凭证从数据库中得到user的相关信息
            User.find({username: req.body.passport.username}, function(err, user_) {
              if (err) {
               return res.json('错误 037：出现异常，请联系管理员');
              } else {
                if (user_.length != 1) return res.json('无评论权限');
                // 创建新的评论
                var comment = new Comments({
                  article: data,  // 文章的 _id
                  username: req.body.passport.username,
                  userAvatarUrl: user_[0].userAvatarUrl,
                  message: req.body.comment.message,
                  time: req.body.comment.time,
                  likes: 0
                });

                // 保存新的评论
                comment.save(function(err, comment_) {
                  if (err) return res.json('错误 038：出现异常，请联系管理员');
                  return res.json('true');
                });
              }
            });
          }
        });
      }
    });
  });

  return router;
}
