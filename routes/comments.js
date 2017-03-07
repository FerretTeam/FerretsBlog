module.exports = function(router, Passport, Article, Comments) {
  // 通过文章的作者和标题返回评论
  // post username & title
  router.post('/get-comments', (req, res) =>{
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    }
    // 通过作者名查找文章id，获取评论
    Passport.findOne({username: req.body.username}, function(err, passport_) {
      if (err) return res.json('错误 022：出现异常，请联系管理员');
      if (passport_ == null) return res.json('该作者不存在');
      Article.findOne({author: passport_._id, title: req.body.title}, function(err, article_){
        if (err) return res.json('错误 023：出现异常，请联系管理员');
        if (article_ == null) return res.json('该文章不存在');
        Comments.find({article: article_._id}, function(err, comments){
          if (err) return res.json('错误 024：出现异常，请联系管理员');
          return res.json(comments);
        });
      });
    });
  });

  // 通过文章的作者和标题添加评论
  // post authorname & title & comment
  router.post('/add-comment', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    } else if (req.body.comment == null || req.body.comment == undefined) {
      return res.json('INVALID_REQUEST');
    }
    Passport.findOne({username: req.body.authorname}, function(err, passport_) {
      if (err) return res.json('错误 025：出现异常，请联系管理员');
      if (passport_ == null) return res.json('该作者不存在');
      console.log(passport_.username, req.body.title);
      Article.findOne({author: passport_._id, title: req.body.title}, function(err, article_){
        if (err) return res.json('错误 026：出现异常，请联系管理员');
        if (article_ == null) return res.json('该文章不存在');
        
        // TODO 判断评论的合法性，包括验证评论者的凭证

        // 创建新的评论
        var comment = new Comments({
          article: article_._id,  // 文章的 _id
          username: req.body.comment.username,
          userAvatarUrl:req.body.comment.userAvatarUrl,
          message: req.body.comment.message,
          time: req.body.comment.time,
          likes: 0
        });
        // 保存新的评论
        comment.save(function(err, comment_) {
          if (err) return res.json('错误 027：出现异常，请联系管理员');
          return res.json('true');
        });
      });
    });
  });

  return router;
}
