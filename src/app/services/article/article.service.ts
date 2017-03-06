import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AuthService } from '../auth/auth.service';
import { Passport } from '../auth/passport';
import { Article, Tag, Comment } from './article';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private authService: AuthService) {}

  // 获取某一页的文章列表，pageNum 从 0 开始编号
  getArticlesByPageNumber(username: string, pageNum: number) {
    return this.http.post('/api/get-articles-by-page-number',
                          {username: username,
                           pageNumber: pageNum},
                          {headers: this.headers})
                    .map((res) => {
                      let temp = res.json();
                      // 对报错信息进行处理
                      if (temp == 'INVALID_REQUEST' || temp == undefined) {
                        console.error(temp);
                        return null;
                      }
                      // 解析成文章列表并返回
                      let articles: any = [];
                      for (let entry of temp) {
                        let newArticle = new Article(entry.date, entry.image, entry.title,
                                                     entry.synopsis, entry.tagName, entry.contents);
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
                      if (temp == 'INVALID_REQUEST' || temp == undefined) {
                        console.error(temp);
                        return null;
                      }
                      // 解析成文章列表并返回
                      return new Article(temp.date, temp.image, temp.title,
                                         temp.synopsis, temp.tagName, temp.contents
                      );
                    });
  }

  // TODO 获取某一文章的评论，可放入 getArticle()
  getComments(username: string, title: string) {
    return null;
  }

  // 获取总文章篇数
  getArticlesNumber(username: string) {
    return this.http.post('/api/get-articles-number',
                          {username: username},
                          {headers: this.headers})
                    .map((res) => {
                      let temp = res.json();
                      // TODO 对 temp 可能存在的报错信息进行处理
                      console.log(temp);
                      // TODO 解析成文章列表并返回
                      return 0;
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
                      // 对 temp 可能存在的报错信息进行处理
                      if (temp == 'INVALID_REQUEST' || temp == undefined) {
                        console.error(temp);
                        return null;
                      }
                      // TODO 解析成文章列表并返回
                      return true;
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
                      // TODO 对 temp 可能存在的报错信息进行处理
                      if (temp == 'INVALID_REQUEST' || temp == undefined) {
                        console.error(temp);
                        return null;
                      }
                      // TODO 解析成文章列表并返回
                      return true;
                    });
  }

  // TODO 获取最热文章
  getPopularArticles() {
    return null;
  }

  // TODO 获取文章的标签
  getTags() {
    return null;
  }

}
