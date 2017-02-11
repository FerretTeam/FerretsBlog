import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Article } from './article';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService {
  articles: Article[] = [
    {
      id: 1,
      date: '2016 年 8 月 16 日',
      image: null,
      title: '春运堵车不怕了 以后我们出门坐飞行汽车',
      synopsis: '希望这类交通工具能够尽早投入市场解决当前的城市交通问题。 *到目前为止，飞行汽车仍然是一个概念，虽然不少人都希望这类交通工具能够缓解甚至解决当前的城市交通问题。*',
      tagName: '科技资讯'
    },
    {
      id: 2,
      date: '2017 年 2 月 6 日',
      image: '.././assets/images/article1.jpeg',
      title: '玫瑰即玫瑰 花香无意义',
      synopsis: '美好的东西都是无需解释的，如诗如画都自足。',
      tagName: '生活随笔'
    },
    {
      id: 3,
      date: '2016 年 6 月 3 日',
      image: '.././assets/images/article3.jpg',
      title: '中国光通信新突破：一根光纤可供 135 亿人同时通话',
      synopsis: '这标志着我国在“超大容量、超长距离、超高速率”光通信系统研究领域迈上了新的台阶。',
      tagName: '科技资讯'
    }
  ];

  constructor(private http: Http) { }

  getArticles() {
    return this.articles;
  }

  getArticle(id: number) {
    return this.articles[id - 1];
  }
}
