module.exports = function(router, Passport, Article) {
  // 根据页码返回用户的文章信息
  // post username & pagenumber
  router.post('/get-articles-by-pagenumber', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    } else if (req.body.username == null || req.body.username == undefined || req.body.pagenumber == null || req.body.pagenumber == undefined) {
      return res.json('INVALID_REQUEST');
    }

    Article.find({author: Passport.findOne({username: req.body.username})._id)}, null, {sort('-date')}, function(err, articles) {
      if (err) {
        return res.json("错误 011：出现异常，请联系管理员");
      } else if (article.length == 0) {
        return res.json("该用户本页面没有文章");
      } else {
        var pagenumber = req.body.pagenumber;
        if (pagenumber < 0 || pagenumber > Math.ceil(this.articles.length / 10)) return res.json("页码错误")
        return res.json(articles.slice(pagenumber * 10, pagenumber * 10 + 10));
      }
    }
  }
  return router;
}
