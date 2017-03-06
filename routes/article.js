module.exports = function(router, Passport, Article) {
  // 根据页码返回用户的文章列表信息
  // post username & pageNumber
  router.post('/get-articles-by-page-number', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    } else if (req.body.username == null || req.body.username == undefined ||
               req.body.pageNumber == null || req.body.pageNumber == undefined) {
      return res.json('INVALID_REQUEST');
    }

    // 按照时间的降序排序查找文章
    Passport.findOne({username: req.body.username} , function(err, passport_) {
      Article.find({author: passport_._id}, null, {sort: {date: -1}}, function(err, articles) {
        if (err) {
          return res.json('错误 011：出现异常，请联系管理员');
        } else {
          var pageNumber = req.body.pageNumber;
          var articleNumber = articles.length;
          if (pageNumber < 0 || pageNumber > Math.ceil(articleNumber / 10))
            return res.json('页码错误')
          else
            return res.json(articles.slice(pageNumber * 10, Math.min(pageNumber * 10 + 10, articleNumber)));
        }
      });
    });
  });

  // 根据文章标题返回用户的文章信息
  // post username & title
  router.post('/get-article-by-title', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    } else if (req.body.username == null || req.body.username == undefined || req.body.title == null || req.body.title == undefined) {
      return res.json('INVALID_REQUEST');
    }

    // 按照时间的降序排序查找文章
    Passport.findOne({username: req.body.username} , function(err, passport_) {
      Article.find({author: passport_._id, title: req.body.title}, function(err, article) {
        if (err) {
          return res.json('错误 012：出现异常，请联系管理员');
        } else {
          if (article.length != 1) return res.json('文章标题错误');
          else return res.json(article[0]);
        }
      });
    });
  });

  // 获取文章数目
  // post username
  router.post('/get-articles-number', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    } else if (req.body.username == null || req.body.username == undefined) {
      return res.json('INVALID_REQUEST');
    }

    // 返回文章数目
    Passport.findOne({username: req.body.username} , function(err, passport_) {
      Article.find({author: passport_._id}, function(err, articles) {
        if (err) return res.json('错误 013：出现异常，请联系管理员');
        else return res.json(articles.length);
      });
    });
  });

  // 创建文章
  // post passport && article
  router.post('/create-article', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    } else if (req.body.passport == null || req.body.passport == undefined ||
               req.body.article == null || req.body.article == undefined) {
      return res.json('INVALID_REQUEST');
    }

    if (req.body.article.title == '') return res.json('文章标题为空');

    // 在 Article 数据库中增加新文章
    Passport.find({username: req.body.passport.username}, function(err, passport_) {
      if (err) {
        return res.json('错误 014：出现异常，请联系管理员');
      } else {
        if (passport_.length != 1) return res.json('该用户不存在！');
        else {
          var article = new Article({
            author: passport_[0]._id,  // 用户凭证的 _id
            date: req.body.article.date,
            image: req.body.article.image,
            title: req.body.article.title,
            synopsis: req.body.article.synopsis,
            tagName: req.body.article.tagName,
            contents: req.body.article.contents
          });
          article.save(function(err, article_) {
            if (err) return res.json('错误 015：出现异常，请联系管理员');
            // 创建新的文章
            else return res.json('true');
          });
        }
      }
    });
  });

  // 更新文章
  // post passport, article, originalTitle
  router.post('/update-article', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    } else if (req.body.passport == null || req.body.passport == undefined ||
               req.body.article == null || req.body.article == undefined ||
               req.body.originalTitle == null || req.body.originalTitle == undefined ) {
      return res.json('INVALID_REQUEST');
    }

    if (req.body.article.title == '') return res.json('文章标题为空');

    // 在Article数据库中更新文章
    Passport.find({username: req.body.passport.username}, function(err, passport_) {
      if (err) {
        return res.json('错误 016：出现异常，请联系管理员');
      } else {
        if (passport_.length != 1) return res.json('该用户不存在！');
        else {
          // 检查是否存在更新后的同名文章
          if (req.body.originalTitle != req.body.article.title) {
            Article.find({author: passport_[0]._id, title: req.body.article.title}, function(err, article_) {
              if (article_.length >= 1) return res.json('更改后的文章标题已经被占用');
            });
          }
          // 更新用户的文章信息
          Article.find({author: passport_[0]._id, title: req.body.originalTitle}, function(err, rawArticle){
            if (err) return res.json('错误 017：出现异常，请联系管理员');
            else {
              if (rawArticle.length != 1) return res.json("原文章不存在");
              else {
                Article.findByIdAndUpdate(rawArticle[0]._id,
                                        {$set:{date: req.body.article.date,
                                              image: req.body.article.image,
                                              title: req.body.article.title,
                                              synopsis: req.body.article.synopsis,
                                              tagName: req.body.article.tagName,
                                              contents: req.body.article.contents}}, {new: true},
                                              function(err, data){
                                                console.log(data);
                                                console.log("right");
                                                if (err) return res.json('错误 017：出现异常，请联系管理员');
                                                else return res.json('true');
                                        });
              }
            }
          });
        }
      }
    });
  });
  return router;
}
