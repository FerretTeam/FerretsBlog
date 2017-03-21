module.exports = function(router, Passport, Article, Comments, User) {
  // 根据页码返回用户的文章列表信息
  // post username & pageNumber
  router.post('/get-articles-by-page-number', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    }

    // 按照时间的降序排序查找文章
    Passport.find({username: req.body.username}, function(err, passport_) {
      if (err) {
        return res.json('错误 011：出现异常，请联系管理员');
      } else {
        if (passport_.length != 1) return res.json('该用户不存在');
        Article.find({author: passport_[0]._id}, null, {sort: {date: -1}}, function(err, articles) {
          if (err) {
            return res.json('错误 012：出现异常，请联系管理员');
          } else {
            var pageNumber = Number(req.body.pageNumber);
            var articleNumber = articles.length;
            if (pageNumber < 0 || pageNumber > Math.ceil(articleNumber / 10)) {
              return res.json('页码错误')
            } else {
              let tempArticles = articles.slice(pageNumber * 10, Math.min(pageNumber * 10 + 10, articleNumber+1));
              for (let entry of tempArticles) {
                entry.tagName = [];
                entry.contents = [];
              }
              return res.json(tempArticles);
            }
          }
        });
      }
    });
  });

  // 根据文章标题返回用户的文章信息
  // post username & title
  router.post('/get-article-by-title', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    }

    Passport.find({username: req.body.username}, function(err, passport_) {
      if (err) {
        return res.json('错误 013：出现异常，请联系管理员');
      } else {
        if (passport_.length != 1) return res.json('该用户不存在');
        Article.find({author: passport_[0]._id, title: req.body.title}, function(err, article) {
          if (err) {
            return res.json('错误 014：出现异常，请联系管理员');
          } else {
            if (article.length != 1) return res.json('文章标题错误');
            else return res.json(article[0]);
          }
        });
      }
    });
  });

  // 获取文章数目
  // post username
  router.post('/get-articles-number', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    }

    // 返回文章数目
    Passport.find({username: req.body.username} , function(err, passport_) {
      if (err) {
        return res.json('错误 015：出现异常，请联系管理员');
      } else {
        if (passport_.length != 1) return res.json('该用户不存在');
        Article.find({author: passport_[0]._id}, function(err, articles) {
          if (err) return res.json('错误 016：出现异常，请联系管理员');
          else return res.json(articles.length);
        });
      }
    });
  });

  checkArticle = function(article) {
    // 文章元素的基础校验
    if (article.title == null || article.title == undefined ||
        article.tagName == null || article.tagName == undefined ||
        article.synopsis == null || article.synopsis == undefined ||
        article.contents == null || article.contents == undefined ||
        article.date == null || article.date == undefined)
      return '文章元素不存在';
    // 检查文章元素是否为空
    let reg = /[^\s]/g;
    let title = String(article.title).match(reg);
    let synopsis = String(article.synopsis).match(reg);
    let contents = String(article.contents).match(reg);
    if (title == null) return '文章标题不能为空';
    if (synopsis == null) return '文章摘要不能为空';
    if (contents == null) return '文章内容不能为空';

    // 检查文章的标签是不是为空
    if (article.tagName.length == 0) return '文章标签不能为空';
    for (let tag of article.tagName) {
      if (String(tag).match(reg).length <= 0) return '文章标签不能为空';
    }

    // 检查文章标签是否有重复
    if (article.tagName.length == 2 && article.tagName[0].localeCompare(article.tagName[1]) == 0)
      return '文章标签不能重复';
    if (article.tagName.length == 3 && (article.tagName[0].localeCompare(article.tagName[1]) == 0 ||
                                        article.tagName[0].localeCompare(article.tagName[2]) == 0 ||
                                        article.tagName[1].localeCompare(article.tagName[2]) == 0))
      return '文章标签不能重复';
    return 'true';
  }

  // 创建文章
  // post passport && article
  router.post('/create-article', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST body');
    } else if (req.body.passport == null || req.body.passport == undefined ||
               req.body.article == null || req.body.article == undefined) {
      return res.json('INVALID_REQUEST');
    }

    // 文章校验
    let errString = checkArticle(req.body.article);
    if (errString != 'true') return res.json(errString);

    // 在 Article 数据库中增加新文章
    Passport.find({username: req.body.passport.username, encryptedPassword: req.body.passport.encryptedPassword}, function(err, passport_) {
      if (err) {
        return res.json('错误 017：出现异常，请联系管理员');
      } else {
        if (passport_.length != 1) {
          return res.json('该用户不存在');
        } else {
          // 检验是否存在相同标题的文章
          Article.find({author: passport_[0]._id, title: req.body.article.title}, function(err, article_) {
            if (article_.length >= 1) return res.json('文章标题已经被占用');
          });
          // 创建新的文章
          var article = new Article({
            author: passport_[0]._id,  // 用户凭证的 _id
            date: req.body.article.date,
            image: req.body.article.image,
            title: req.body.article.title,
            synopsis: req.body.article.synopsis,
            tagName: req.body.article.tagName,
            contents: req.body.article.contents,
            likes: 0,
            characters: req.body.article.characters
          });
          article.save(function(err, article_) {
            if (err) return res.json('错误 018：出现异常，请联系管理员');
            else {
              // 更新用户的总字数
              User.findOne({username: req.body.passport.username}, function(err, user_) {
                if (err) return res.json('错误 019：出现异常，请联系管理员');
                let num = user_.totalCharacters + req.body.article.characters;
                User.findByIdAndUpdate(user_._id, { $set: {totalCharacters: num}}, {new: true},
                  function(err, data) {
                    if (err) return res.json('错误 020：出现异常，请联系管理员');
                  });
              });
              return res.json('true');
            }
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
               req.body.article == null || req.body.article == undefined) {
      return res.json('INVALID_REQUEST');
    }

    // 文章校验
    let errString = checkArticle(req.body.article);
    if (errString != 'true') return res.json(errString);

    // 在 Article 数据库中更新文章
    Passport.find({username: req.body.passport.username, encryptedPassword: req.body.passport.encryptedPassword}, function(err, passport_) {
      if (err) {
        return res.json('错误 021：出现异常，请联系管理员');
      } else {
        if (passport_.length != 1) {
          return res.json('该用户不存在！');
        } else {
          // 检查是否存在更新后的同名文章
          if (req.body.originalTitle != req.body.article.title) {
            Article.find({author: passport_[0]._id, title: req.body.article.title}, function(err, article_) {
              if (article_.length >= 1) return res.json('更改后的文章标题已经被占用');
            });
          }
          // 更新用户的文章信息
          Article.find({author: passport_[0]._id, title: req.body.originalTitle}, function(err, rawArticle){
            if (err) {
              return res.json('错误 022：出现异常，请联系管理员');
            } else {
              if (rawArticle.length != 1) {
                return res.json("原文章不存在");
              } else {
                // 更新用户的总字数
                User.findOne({username: req.body.passport.username}, function(err, user_) {
                  if (err) return res.json('错误 023：出现异常，请联系管理员');
                  let num = user_.totalCharacters + req.body.article.characters - rawArticle[0].characters;
                  User.findByIdAndUpdate(user_._id, { $set: {totalCharacters: num}}, {new: true},
                    function(err, data) {
                      if (err) return res.json('错误 024：出现异常，请联系管理员');
                    });
                });
                // 更新文章信息
                Article.findByIdAndUpdate(rawArticle[0]._id,
                                          {$set: {date: req.body.article.date,
                                                  image: req.body.article.image,
                                                  title: req.body.article.title,
                                                  synopsis: req.body.article.synopsis,
                                                  tagName: req.body.article.tagName,
                                                  contents: req.body.article.contents,
                                                  characters: req.body.article.characters}}, {new: true},
                                                  function(err, data) {
                                                    if (err) return res.json('错误 025：出现异常，请联系管理员');
                                                    else return res.json('true');
                                          });
              }
            }
          });
        }
      }
    });
  });

  // 获取最热文章，由点赞数确定
  // post authorname
  router.post('/get-popular-articles', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    }

    // 文章校验
    Passport.find({username: req.body.authorname}, function(err, passport_) {
      if (err) {
        return res.json('错误 025：出现异常，请联系管理员');
      } else {
        if (passport_.length != 1) return res.json('该用户不存在');
        Article.find({author: passport_[0]._id}, null, {sort: {likes: -1}}, function(err, articles) {
          if (err) {
            return res.json('错误 026：出现异常，请联系管理员');
          } else {
            var articleNumber = articles.length;
            let tempArticles = articles.slice(0, Math.min(10, articleNumber+1));
            let titles = new Array();
            for (let entry of tempArticles) {
              titles.push(entry.title);
            }
            return res.json(titles);
          }
        });
      }
    });

  });

  // 删除文章
  // post passport & title
  router.post('/delete-article', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    } else if (req.body.passport == null || req.body.passport == undefined) {
      return res.json('INVALID_REQUEST');
    }

    // 文章校验
    Passport.find({username: req.body.passport.username, encryptedPassword: req.body.passport.encryptedPassword}, function(err, passport_) {
      if (err) {
        return res.json('错误 027：出现异常，请联系管理员');
      } else {
        if (passport_.length != 1) return res.json('用户凭证有问题');
        // TODO 更新用户的总赞数

        Article.find({author: passport_[0]._id, title: req.body.title}, function(err, article_) {
          if (err) {
            return res.json('错误 028：出现异常，请联系管理员');
          } else {
            // 更新用户的总字数
            User.findOne({username: req.body.passport.username}, function(err, user_) {
              if (err) return res.json('错误 029：出现异常，请联系管理员');
              let num = user_.totalCharacters - article_[0].characters;
              User.findByIdAndUpdate(user_._id, { $set: {totalCharacters: num}}, {new: true},
                function(err, data) {
                  if (err) return res.json('错误 030：出现异常，请联系管理员');
                  else {
                    // 删除文章的评论
                    Comments.remove({article: article_[0]._id}, function(err) {
                      if (err) return res.json('错误 031：出现异常，请联系管理员');
                      else {
                        Article.remove({author: passport_[0]._id, title: req.body.title}, function(err) {
                          if (err) {
                            return res.json('错误 032：出现异常，请联系管理员');
                          } else {
                            return res.json('true');
                          }
                        });
                      }
                    });
                  }
              });
            });
          }
        });
      }
    });
  });

  // 获取文章标签
  // post authorname
  router.post('/get-tags', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    }

    // 查找tags
    Passport.find({username: req.body.authorname}, function(err, passport) {
      if (err) return res.json('错误 033：出现异常，请联系管理员');
      if (passport.length != 1) return res.json('该用户不存在');
      Article.find({author: passport[0]._id}, 'tagName', function(err, articles) {
        if (err) return res.json('错误 034：出现异常，请联系管理员');
        let totalTag = new Array();
        for (let entry of articles) {
          for (let item of entry.tagName) {
            totalTag.push(item);
          }
        }
        return res.json(totalTag.sort());
      });
    });
  });

  // TODO 测试更新文章点赞数
  // post authorname & title
  router.post('/update-likes', (req, res) => {
    // 基础校验
    if (req.body == null || req.body == undefined) {
      return res.json('INVALID_REQUEST');
    }

    // 更新用户的总点赞数
    User.find({username: req.body.authorname}, function(err, user_) {
      if (err) return res.json('错误 035：出现异常，请联系管理员');
      if (user_.length != 1) return res.json('该用户不存在');
      let num = user_[0].totalLikes + 1;
      User.findByIdAndUpdate(user_[0]._id, { $set: {totalLikes: num}}, {new: true},
        function(err, data) {
          if (err) return res.json('错误 036：出现异常，请联系管理员');
      });
    });

    // 更新文章的点赞数
    Passport.find({username: req.body.authorname}, function(err, passport) {
      if (err) return res.json('错误 037：出现异常，请联系管理员');
      if (passport.length != 1) return res.json('该用户不存在');
      Article.find({author: passport[0]._id, title: req.body.title}, 'tagName', function(err, article_) {
        if (err) return res.json('错误 038：出现异常，请联系管理员');
        if (article_.length != 1) return res.json('该文章不存在');
        let likes = article_[0].likes + 1;
        Article.findByIdAndUpdate(article_[0]._id, { $set: {likes: likes}}, {new: true},
          function(err, data) {
            if (err) return res.json('错误 039：出现异常，请联系管理员');
            else return res.json('true');
        });
      });
    });
  });

  return router;
}
