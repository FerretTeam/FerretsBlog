import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AuthService } from '../auth/auth.service';
import { Passport } from '../auth/passport';
import { Article, Tag, Comment } from './article';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService {
  private headers = new Headers({'Content-Type': 'application/json'});
  static articleUrlForDialog: string = '';

  constructor(private http: Http, private authService: AuthService) {}
  // 为了排版便利，在 service 中将大数转换为 k 或 m
  numberToString(num: number) {
    if (num > 1000000)
      return String((num / 1000000).toFixed(1)) + 'm';
    else if (num > 1000)
      return String((num / 1000).toFixed(1)) + 'k';
    else
      return String(num);
  }

  // 获取某一页的文章列表，pageNum 从 0 开始编号
  getArticlesByPageNumber(username: string, pageNum: number) {
    return this.http.post('/api/get-articles-by-page-number',
                          {username: username,
                           pageNumber: pageNum},
                          {headers: this.headers})
                    .map((res) => {
                      let temp = res.json();
                      // 对报错信息进行处理
                      if (temp == 'INVALID_REQUEST' ||
                          (temp[0] != undefined && temp[0].date == undefined)) {
                        console.error(temp);
                        return null;
                      }
                      let articles: any = [];
                      for (let entry of temp) {
                        let newArticle = new Article(entry.date, entry.image, entry.title,
                                                     entry.synopsis, entry.tagName, entry.contents, 0);
                        articles.push(newArticle);
                      }
                      return articles;
                    });
  }

  // 获取某一篇文章
  getArticle(username: string, title: string) {
    return this.http.post('/api/get-article-by-title',
                          {username: username,
                           title: title},
                          {headers: this.headers})
                    .map((res) => {
                      let temp = res.json();
                      // 对 temp 可能存在的报错信息进行处理
                      if (temp == 'INVALID_REQUEST' || temp.date == undefined) {
                        console.error(temp);
                        return null;
                      }
                      return new Article(temp.date, temp.image, temp.title,
                                         temp.synopsis, temp.tagName, temp.contents, 0
                      );
                    });
  }

  // 创建新文章
  createArticle(article: Article) {
    let passport = this.authService.getPassport();
    return this.http.post('/api/create-article',
                          {passport: passport,
                           article: article},
                          {headers: this.headers})
                    .map((res) => {
                      let temp = res.json();
                      return temp;
                    });
  }

  // 删除文章
  deleteArticle(title: string) {
    let passport = this.authService.getPassport();
    return this.http.post('/api/delete-article',
                          {passport: passport,
                           title: title},
                          {headers: this.headers})
                    .map((res) => {
                      let temp = res.json();
                      console.log(temp);
                      return temp;
                    });
  }

  // 更新文章
  updateArticle(article: Article, originalTitle: string) {
    let passport = this.authService.getPassport();
    return this.http.post('/api/update-article',
                          {passport: passport,
                           article: article,
                           originalTitle: originalTitle},
                          {headers: this.headers})
                    .map((res) => {
                      let temp = res.json();
                      return temp;
                    });
  }

  // 获取总文章篇数
  getArticlesNumber(username: string) {
    return this.http.post('/api/get-articles-number',
                          {username: username},
                          {headers: this.headers})
                    .map((res) => {
                      let temp = res.json();
                      // 对 temp 可能存在的报错信息进行处理
                      if (temp == 'INVALID_REQUEST' || Number(temp) == NaN) {
                        console.error(temp);
                        return null;
                      }
                      return temp;
                    });
  }

  // 获取某一文章的评论
  getComments(authorname: string, title: string) {
    return this.http.post('/api/get-comments',
                          {authorname: authorname, title: title},
                          {headers: this.headers})
                     .map((res) => {
                       let temp = res.json();
                       // 对 temp 可能存在的报错信息进行处理
                       if (temp == 'INVALID_REQUEST' ||
                           (temp[0] != undefined && temp[0].article == undefined)) {
                         console.error(temp);
                         return null;
                       }
                       let comments: any = [];
                       for (let entry of temp) {
                         let newComment = new Comment(entry.username, entry.userAvatarUrl, entry.message,
                                                      entry.time, this.numberToString(entry.likes));
                         comments.push(newComment);
                       }
                       return comments;
                     });
  }

  // 增加评论
  addComment(authorname: string, title: string, comment: Comment) {
    let passport = this.authService.getPassport();
    return this.http.post('/api/add-comment',
                          {authorname: authorname, title: title, comment: comment, passport: passport},
                          {headers: this.headers})
                     .map((res) => {
                       let temp = res.json();
                       // 对 temp 可能存在的报错信息进行处理
                       if (temp != 'true')
                         console.error(temp);
                       return temp;
                     });
  }

  // 获取最热文章
  getPopularArticles() {
    let passport = this.authService.getPassport();
    return this.http.post('/api/get-popular-articles',
                          {authorname: passport.username},
                          {headers: this.headers})
                    .map((res) => {
                      let temp = res.json();
                      return temp;
                    });
  }

  // TODO 获取文章的标签
  getTags() {
    let passport = this.authService.getPassport();
    return this.http.post('/api/get-tags',
                          {authorname: passport.username},
                          {headers: this.headers})
                    .map((res) => {
                      let temp = res.json();
                      if (temp != 'true') {
                        console.error(temp);
                        return null;
                      }
                      return temp;
                    });
  }

}
