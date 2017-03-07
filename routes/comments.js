module.exports = function(router, Passport, Article, Comments) {
  // 通过用户名查找用户凭证, 通过用户凭证 id 和文章标题查找文章，返回文章的 id
  findArticleId = function(username, title) {
    Passport.findOne({username: username}, function(err, passport_) {
      if (err) return 'error';
      Article.findOne({author: passport_._id, title: title}, function(err, article){
        if (err) return 'error';
        if (article.length == 0) return 'empty';
        return article._id;
      });
    });
  }

  // 通过文章的作者和标题返回评论
  // post passport & title
  router.post('/get-comments', (req, res) =>{
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST 2');
    }

    // 验证用户凭证
    let findString = findArticleId(req.body.username, req.body.title);

    // 通过文章 id 查找评论
    if ( findString == 'empty') {
      return res.json('无法找到相应文章');
    } else if ( findString == 'error') {
      return res.json('错误 022：出现异常，请联系管理员');
    } else {
      Comments.find({article: findString, title: req.body.title}, function(err, comments){
        if (err) return res.json('错误 023：出现异常，请联系管理员');
        return res.json(comments);
      });
    }
  });

  return router;
}
