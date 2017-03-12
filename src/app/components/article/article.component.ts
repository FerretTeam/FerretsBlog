import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MdSnackBar } from '@angular/material';
import * as marked from 'marked';
import highlightjs from 'highlight.js';

import { Article, Comment } from '../../services/article/article';
import { ArticleService } from '../../services/article/article.service';
import { User } from '../../services/user/user';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass']
})
export class ArticleComponent implements OnInit {
  article: Article;
  comments: Comment[] = [];
  user: User;
  authorName: string;

  constructor(private articleService: ArticleService, private router: Router,
              public snackBar: MdSnackBar, private userService: UserService,
              private activatedRoute: ActivatedRoute, private authService: AuthService) {
    // 取回用户信息
    if (this.authService.getPassport() != null)
      this.userService.getUserInfo().subscribe(data => this.user = data);

    // 设定 marked 的参数
    const renderer = new marked.Renderer();
    renderer.code = (code, language) => {
      const validLang = !!(language && highlightjs.getLanguage(language));
      const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
      return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
    };

    marked.setOptions({ renderer });

    // 取回文章的信息
    this.activatedRoute.params.subscribe(params => {
      this.articleService.getArticle(params['user'], params['title']).subscribe(data => {
        if (data != null) {
          this.article = data;
          let refresh = setInterval(function() {
            let articleContent = document.getElementById('article-content');
            if (articleContent && data) {
              articleContent.innerHTML = marked(data.contents);
              clearInterval(refresh);
            }
          }, 10);
        }
      });
      this.authorName = params['user'];
      this.articleService.getComments(this.authorName, params['title']).subscribe(data => {
        this.comments = data;
      });
    });
  }

  getDateString(date: Date) {
    let jsDate = new Date(date);
    return jsDate.getFullYear() + ' 年 ' + jsDate.getMonth() + ' 月 ' +
           jsDate.getDate() + ' 日';
  }

  addComment() {
    var message = (<HTMLInputElement>document.getElementById('comment-content')).value;
    // 判断评论内容是否为空
    if (message.match(/[^\s]/g) == null) {
      (<HTMLInputElement>document.getElementById('comment-content')).value = '';
      this.snackBar.open('评论内容不可为空', '知道了', { duration: 2000 });
      return;
    }
    // 创建新的评论
    var newComment = new Comment(this.user.username, this.user.userAvatarUrl, message, new Date(), '0');
    this.articleService.addComment(this.authorName, this.article.title, newComment).subscribe(data => {
      if (data == 'true') {
        this.snackBar.open('发布成功', '知道了', { duration: 2000 });
        (<HTMLInputElement>document.getElementById('comment-content')).value = '';
        this.comments.unshift(newComment);
      } else {
        this.snackBar.open('发布失败', '知道了', { duration: 2000 });
      }
    });
  }

  gotoSignIn() {
    this.router.navigate(['/login', 'sign-in']);
  }

  getTimeString(time: Date) {
    // 定义当前和当时的时间
    let now = new Date();
    let thatTime = new Date(time);
    // 计算差值
    let inMillisecond: number = now.getTime() - thatTime.getTime();
    let inMinute: number = inMillisecond / (1000 * 60);
    let inHour: number = inMillisecond / (1000 * 60 * 60);
    let inDay: number = inMillisecond / (1000 * 60 * 60 * 24);
    let inMonth: number = now.getMonth() + 12 * now.getFullYear() -
                          thatTime.getMonth() - 12 * thatTime.getFullYear();
    let inYear: number = now.getFullYear() - thatTime.getFullYear();
    // 判断返回值
    if (inMinute < 1) return '刚刚';
    else if (inHour < 1) return Math.ceil(inMinute) + '分钟前';
    else if (inDay < 1) return Math.ceil(inHour) + '小时前';
    else if (inMonth < 1) return Math.ceil(inDay) + '天前';
    else if (inYear < 1) return Math.ceil(inMonth) + '月前';
    else return Math.ceil(inYear) + '年前';
  }

  ngOnInit() {}

}
