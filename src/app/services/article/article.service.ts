import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AuthService } from '../auth/auth.service';
import { Passport } from '../auth/passport';
import { Article, Tag, Comment } from './article';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService {
  private headers = new Headers({'Content-Type': 'application/json'});

  // 文章假数据
  rawArticles: Article[] = [
    {
      date: '2016 年 8 月 16 日',
      image: null,
      title: '春运堵车不怕了 以后我们出门坐飞行汽车',
      synopsis: '希望这类交通工具能够尽早投入市场解决当前的城市交通问题。 到目前为止，飞行汽车仍然是一个概念，虽然不少人都希望这类交通工具能够缓解甚至解决当前的城市交通问题。',
      tagName: ['科技资讯'],
      contents: '## Vahana\nVahana 是空客公司正在开发的一款无人驾驶飞行汽车，它可以实现垂直升降，前后配置有 6 个推进器，其原型机预计将在今年年底进入测试阶段，并于 2020 年之前批量生产。\n## Cormorant\nCormorant 是来自以色列的 Urban Aeronautics 开发的载人无人机，拥有垂直升降功能，并且配有标准的直升机引擎，尾部配有两个助推器，其最高时速能够达到 115 英里(大约 185 公里)。\n```C\n#include "stdio.h"\n\nint main() {\n\treturn 0;\n}\n```'
    },
    {
      date: '2017 年 2 月 6 日',
      image: '.././assets/images/article1.jpeg',
      title: '玫瑰即玫瑰 花香无意义',
      synopsis: '美好的东西都是无需解释的，如诗如画都自足。',
      tagName: ['生活随笔'],
      contents: '## Vahana\nVahana 是空客公司正在开发的一款无人驾驶飞行汽车，它可以实现垂直升降，前后配置有 6 个推进器，其原型机预计将在今年年底进入测试阶段，并于 2020 年之前批量生产。\n## Cormorant\nCormorant 是来自以色列的 Urban Aeronautics 开发的载人无人机，拥有垂直升降功能，并且配有标准的直升机引擎，尾部配有两个助推器，其最高时速能够达到 115 英里(大约 185 公里)。\n```C\n#include "stdio.h"\n\nint main() {\n\treturn 0;\n}\n```'
    },
    {
      date: '2016 年 6 月 3 日',
      image: '.././assets/images/article3.jpg',
      title: '中国光通信新突破：一根光纤可供 135 亿人同时通话',
      synopsis: '这标志着我国在“超大容量、超长距离、超高速率”光通信系统研究领域迈上了新的台阶。',
      tagName: ['科技资讯'],
      contents: '## Vahana\nVahana 是空客公司正在开发的一款无人驾驶飞行汽车，它可以实现垂直升降，前后配置有 6 个推进器，其原型机预计将在今年年底进入测试阶段，并于 2020 年之前批量生产。\n## Cormorant\nCormorant 是来自以色列的 Urban Aeronautics 开发的载人无人机，拥有垂直升降功能，并且配有标准的直升机引擎，尾部配有两个助推器，其最高时速能够达到 115 英里(大约 185 公里)。\n```C\n#include "stdio.h"\n\nint main() {\n\treturn 0;\n}\n```'
    }
  ];
  // 评论假数据
  rawComments: Comment[] = [
    {
      username: '桉',
      userAvatarUrl: '.././assets/images/user-avatar2.jpg',
      message: '到目前为止，飞行汽车仍然是一个概念，虽然不少人都希望这类交通工具能够缓解甚至解决当前的城市交通问题。今天，我们就来说一说那些正在开发的飞行汽车。',
      time: '2 小时前',
      likes: '16'
    },
    {
      username: 'An0nym6',
      userAvatarUrl: '.././assets/images/user-avatar.jpg',
      message: 'Cormorant 是来自以色列的 Urban Aeronautics 开发的载人无人机，拥有垂直升降功能，并且配有标准的直升机引擎，尾部配有两个助推器，其最高时速能够达到 115 英里(大约 185 公里)。',
      time: '1 天前',
      likes: '7'
    }
  ];

  // 本 service 持久储存的唯一变量
  // 在持久化前通过构造函数用 raw data 对它进行赋值
  articles: Article[] = [];

  // 临时缓存 tags 的变量
  tags: Tag[] = [];

  constructor(private http: Http, private authService: AuthService) {
    let i: number;
    for (i = 0; i < 77; i++) {
      // 深拷贝
      var newArticle = new Article(this.rawArticles[i % 3].date, this.rawArticles[i % 3].image,
                                   this.rawArticles[i % 3].title, this.rawArticles[i % 3].synopsis,
                                   this.rawArticles[i % 3].tagName, this.rawArticles[i % 3].contents);
      this.articles.push(newArticle);
    }
  }

  // 获取某一页的文章
  // TODO 流量优化
  getArticles(pageNum: number) {
    pageNum--;
    if (pageNum < 0 || pageNum > Math.ceil(this.articles.length / 10))
      return null;
    // return this.articles.slice(pageNum * 10, pageNum * 10 + 10);
    let passport = this.authService.getPassport();
    return this.http.post('/api/get-articles-by-pagenumber',
                        {username: passport.username,
                         pagenumber: pageNum},
                        {headers: this.headers})
                    .map((res) => res.json());
  }

  // 获取某一文章的评论
  getComments(id: number) {
    return this.rawComments;
  }

  // 获取现在文章的最大页数（每页 10 篇）
  getMaxPageNumber() {
    let passport = this.authService.getPassport();
    return this.http.post('/api/get-articles-number',{username: passport.username},{headers: this.headers})
                    .map((res) => {
                      let number = res.json();
                      return Math.ceil(number / 10);
                    });
  }

  // 获取某一页的文章
  getArticle(id: number) {
    let passport = this.authService.getPassport();
    return this.http.post('/api/get-articles-by-index',
                        {username: passport.username,
                         index: id},
                        {headers: this.headers})
                    .map(res => res.json());
  }

  // 创建新文章
  createArticle() {

  }

  // 获取最热文章
  getPopularArticles() {
    return this.articles.slice(0, 5);
  }

  // 获取文章的标签
  getTags() {
    // 遍历文章统计标签
    return this.tags;
  }
}
