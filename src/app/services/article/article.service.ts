import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Article, Tag, Comment } from './article';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService {
  raw: Article[] = [
    {
      id: 0,
      date: '2016 年 8 月 16 日',
      image: null,
      title: '春运堵车不怕了 以后我们出门坐飞行汽车',
      synopsis: '希望这类交通工具能够尽早投入市场解决当前的城市交通问题。 到目前为止，飞行汽车仍然是一个概念，虽然不少人都希望这类交通工具能够缓解甚至解决当前的城市交通问题。',
      tagName: '科技资讯',
      contents: '## Vahana\nVahana 是空客公司正在开发的一款无人驾驶飞行汽车，它可以实现垂直升降，前后配置有 6 个推进器，其原型机预计将在今年年底进入测试阶段，并于 2020 年之前批量生产。\n## Cormorant\nCormorant 是来自以色列的 Urban Aeronautics 开发的载人无人机，拥有垂直升降功能，并且配有标准的直升机引擎，尾部配有两个助推器，其最高时速能够达到 115 英里(大约 185 公里)。\n```C\n#include "stdio.h"\n\nint main() {\n\treturn 0;\n}\n```'
    },
    {
      id: 1,
      date: '2017 年 2 月 6 日',
      image: '.././assets/images/article1.jpeg',
      title: '玫瑰即玫瑰 花香无意义',
      synopsis: '美好的东西都是无需解释的，如诗如画都自足。',
      tagName: '生活随笔',
      contents: '## Vahana\nVahana 是空客公司正在开发的一款无人驾驶飞行汽车，它可以实现垂直升降，前后配置有 6 个推进器，其原型机预计将在今年年底进入测试阶段，并于 2020 年之前批量生产。\n## Cormorant\nCormorant 是来自以色列的 Urban Aeronautics 开发的载人无人机，拥有垂直升降功能，并且配有标准的直升机引擎，尾部配有两个助推器，其最高时速能够达到 115 英里(大约 185 公里)。\n```C\n#include "stdio.h"\n\nint main() {\n\treturn 0;\n}\n```'
    },
    {
      id: 2,
      date: '2016 年 6 月 3 日',
      image: '.././assets/images/article3.jpg',
      title: '中国光通信新突破：一根光纤可供 135 亿人同时通话',
      synopsis: '这标志着我国在“超大容量、超长距离、超高速率”光通信系统研究领域迈上了新的台阶。',
      tagName: '科技资讯',
      contents: '## Vahana\nVahana 是空客公司正在开发的一款无人驾驶飞行汽车，它可以实现垂直升降，前后配置有 6 个推进器，其原型机预计将在今年年底进入测试阶段，并于 2020 年之前批量生产。\n## Cormorant\nCormorant 是来自以色列的 Urban Aeronautics 开发的载人无人机，拥有垂直升降功能，并且配有标准的直升机引擎，尾部配有两个助推器，其最高时速能够达到 115 英里(大约 185 公里)。\n```C\n#include "stdio.h"\n\nint main() {\n\treturn 0;\n}\n```'
    }
  ];
  articles: Article[] = [];
  tags: Tag[] = [];
  comments: Comment[] = [
    {
      username: '桉',
      userAvatarUrl: '.././assets/images/user-avatar2.png',
      message: '到目前为止，飞行汽车仍然是一个概念，虽然不少人都希望这类交通工具能够缓解甚至解决当前的城市交通问题。今天，我们就来说一说那些正在开发的飞行汽车。',
      time: '2 小时前',
      likes: 16
    },
    {
      username: 'An0nym6',
      userAvatarUrl: '.././assets/images/user-avatar.jpg',
      message: 'Cormorant 是来自以色列的 Urban Aeronautics 开发的载人无人机，拥有垂直升降功能，并且配有标准的直升机引擎，尾部配有两个助推器，其最高时速能够达到 115 英里(大约 185 公里)。',
      time: '1 天前',
      likes: 16
    }
  ];

  constructor(private http: Http) {
    let i: number;
    for (i = 0; i < 27; i++) {
      var newArticle = new Article();
      // 深拷贝
      newArticle.id = i; newArticle.date = this.raw[i % 3].date;
      newArticle.image = this.raw[i % 3].image; newArticle.title = this.raw[i % 3].title;
      newArticle.synopsis = this.raw[i % 3].synopsis; newArticle.tagName = this.raw[i % 3].tagName;
      newArticle.contents = this.raw[i % 3].contents;
      this.articles.push(newArticle);
    }
  }

  getArticles(pageNum: number) {
    pageNum--;
    if (pageNum < 0 || pageNum > Math.ceil(this.articles.length / 10))
      return null;
    return this.articles.slice(pageNum * 10, pageNum * 10 + 10);
  }

  getMaxPageNumber() {
    return Math.ceil(this.articles.length / 10);
  }

  getArticle(id: number) {
    return this.articles[id];
  }

  getPopularArticles() {
    return this.articles.slice(0, 5);
  }

  getTags() {
    // 遍历文章统计标签
    for (let article of this.articles) {
      let isExist: boolean = false;
      for (let tag of this.tags)
        if (tag.tagName == article.tagName) {
          tag.number++;
          isExist = true;
          break;
        }
      if (!isExist)
        this.tags.push(new Tag(article.tagName, 1));
    }
    this.tags.sort();
    return this.tags;
  }

  getComments(id: number) {
    return this.comments;
  }
}
