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
      synopsis: '希望这类交通工具能够尽早投入市场解决当前的城市交通问题。 到目前为止，飞行汽车仍然是一个概念，虽然不少人都希望这类交通工具能够缓解甚至解决当前的城市交通问题。',
      tagName: '科技资讯',
      contents: '## Vahana\nVahana 是空客公司正在开发的一款无人驾驶飞行汽车，它可以实现垂直升降，前后配置有 6 个推进器，其原型机预计将在今年年底进入测试阶段，并于 2020 年之前批量生产。\n## Cormorant\nCormorant 是来自以色列的 Urban Aeronautics 开发的载人无人机，拥有垂直升降功能，并且配有标准的直升机引擎，尾部配有两个助推器，其最高时速能够达到 115 英里(大约 185 公里)。'
    },
    {
      id: 2,
      date: '2017 年 2 月 6 日',
      image: '.././assets/images/article1.jpeg',
      title: '玫瑰即玫瑰 花香无意义',
      synopsis: '美好的东西都是无需解释的，如诗如画都自足。',
      tagName: '生活随笔',
      contents: '这句话的出处分别出自博尔赫斯《七夜》（陈泉译本）129页和《博尔赫斯访谈录》（西川译本）250页。\n翻译过来是说：玫瑰开放了，它没有理由地开放了。访谈录的翻译是：玫瑰无因由，花开即花开。\n《七夜》的这一处的用法要说明的是：美感是一种肉体感受，一种我们全身感受得到的东西。它不是某种判断的结果，我们不是按照某种规矩达到的，要么我们感受到美，要么感受不到。\n《访谈录》的用法是：史蒂文森的诗歌不需要什么过多的解释。他的诗歌是自足的。'
    },
    {
      id: 3,
      date: '2016 年 6 月 3 日',
      image: '.././assets/images/article3.jpg',
      title: '中国光通信新突破：一根光纤可供 135 亿人同时通话',
      synopsis: '这标志着我国在“超大容量、超长距离、超高速率”光通信系统研究领域迈上了新的台阶。',
      tagName: '科技资讯',
      contents: '新华社武汉2月5日电（记者徐海波）武汉邮电科学研究院4日宣布，在国内首次实现560Tb/s超大容量波分复用及空分复用的光传输系统实验，可以实现一根光纤上67.5亿对人（135亿人）同时通话，这标志着我国在“超大容量、超长距离、超高速率”光通信系统研究领域迈上了新的台阶。'
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
