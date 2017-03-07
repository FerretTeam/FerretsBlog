module.exports = function(router, Passport, Article, Comments) {
  // 通过用户名查找用户凭证, 通过用户凭证 id 和文章标题查找文章，返回文章的 id
  findArticleId = function(passport, title) {
    Passport.find({username: passport.username}, function(err, passport_) {
      if (err) {
        
      }
    });
  }

  // 通过文章的作者和标题返回评论
  // post passport & title
  router.post('/get-comments', (req, res) =>{
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    } else if (req.body.passport == null || req.body.passport == undefined ||) {
      return res.json('INVALID_REQUEST');
    }

    // 验证用户凭证
    if (findArticleId) {

    }

    // 通过文章 id 查找评论
  });

  // 通过文章的作者和标题以及评论者的
  return router;
}
