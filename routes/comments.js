module.exports = function(router, Passport, Article, Comments) {
  // 通过作者名和文章标题查找文章的 _id
  findArticleId= function(authorname, title, callback) {
    Passport.findOne({username: authorname}, function(err, passport_) {
      if (err) {
        callback('错误 030：出现异常，请联系管理员');
        return;
      }
      if (passport_ == null) callback('empty');
      Article.findOne({author: passport_._id, title: title}, function(err, article_){
        if (err) {
          callback('错误 031：出现异常，请联系管理员');
          return;
        }
        if (article_ == null) callback('empty');
        else callback(article_._id);
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
      if (data == 'empty') {
        return res.json('无法找到相应文章');
      } else if ( data == 'error') {
        return res.json('错误 032：出现异常，请联系管理员');
      } else {
        Comments.find({article: data}, null, {sort: {likes: -1}}, function(err, comments){
            if (err) return res.json('错误 033：出现异常，请联系管理员');
            return res.json(comments);
        });
      }
    });
  });

  // 通过文章的作者、标题以及评论者的信息添加评论
  // post authorname & title & comment
  router.post('/add-comment', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    } else if (req.body.comment == null || req.body.comment == undefined) {
      return res.json('INVALID_REQUEST');
    }

    // 查找文章的id
    findArticleId(req.body.authorname, req.body.title, function(data) {
      if (data == 'empty') {
        return res.json('无法找到相应文章');
      } else if ( data == 'error') {
        return res.json('错误 034：出现异常，请联系管理员');
      } else {
        // TODO 判断评论的合法性，包括验证评论者的凭证

        // 创建新的评论
        // TODO 通过评论者的凭证从数据库中得到user的相关信息

        var comment = new Comments({
          article: data,  // 文章的 _id
          username: req.body.comment.username,
          userAvatarUrl:req.body.comment.userAvatarUrl,
          message: req.body.comment.message,
          time: req.body.comment.time,
          likes: 0
        });
        // 保存新的评论
        comment.save(function(err, comment_) {
          if (err) return res.json('错误 035：出现异常，请联系管理员');
          return res.json('true');
        });
      }
    });
  });

  return router;
}
