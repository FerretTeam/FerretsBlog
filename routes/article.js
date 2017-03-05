module.exports = function(router, Passport, Article) {
  // 根据页码返回用户的文章信息
  // post username & pageNumber
  router.post('/get-articles-by-pageNumber', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    } else if (req.body.username == null || req.body.username == undefined ||
               req.body.pageNumber == null || req.body.pageNumber == undefined) {
      return res.json('INVALID_REQUEST');
    }

    // 按照时间的降序排序查找文章
    Article.find({author: Passport.findOne({username: req.body.username}).id}, null, {sort: {date: -1}}, function(err, articles) {
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

  // 根据序号返回用户的文章信息
  // post username & index
  router.post('/get-articles-by-index', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    } else if (req.body.username == null || req.body.username == undefined || req.body.index == null || req.body.index == undefined) {
      return res.json('INVALID_REQUEST');
    }

    // 按照时间的降序排序查找文章
    Article.find({author: Passport.findOne({username: req.body.username}).id}, null, {sort: {date: -1}}, function(err, articles) {
      if (err) {
        return res.json('错误 011：出现异常，请联系管理员');
      } else {
        var index = req.body.index;
        if (index < 0 || index > Article.find({}).length ) return res.json('序号错误')
        else return res.json(articles.slice(index, index+1));
      }
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
    Article.find({}, function(err, articles) {
      if (err) return res.json('错误 012：出现异常，请联系管理员');
      else return res.json(articles.length);
    });
  });

  // 创建文章
  // post passport, article
  router.post('/create-new-article', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    } else if (req.body.passport == null || req.body.passport == undefined || req.body.article == null || req.body.article == undefined ) {
      return res.json('INVALID_REQUEST');
    }

    // 在Article数据库中增加新文章
    Passport.find({username: passport.username}, function(err, passport) {
      if (err) {
        return res.json('错误 013：出现异常，请联系管理员');
      } else {
        var article = new Article({
          author: passport.id,  // 用户凭证的 _id
          date: req.body.date,
          image: req.body.image,
          title: req.body.title,
          synopsis: req.body.synopsis,
          tagName: req.body.tagName,
          contents: req.body.contents
        });
        article.save(function(err, article) {
          if (err) return res.json('错误 014：出现异常，请联系管理员');
          // 创建新的用户
          else return res.json('true');
        });
      }
    });
  });
  return router;
}
