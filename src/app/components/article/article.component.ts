import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import * as marked from 'marked';
import highlightjs from 'highlight.js';

import { Article, Comment } from '../../services/article/article';
import { ArticleService } from '../../services/article/article.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../services/user/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass']
})
export class ArticleComponent implements OnInit {
  article: Article;
  data: string;
  comments: Comment[];
  user: User;


  constructor(private articleService: ArticleService, private router: Router,
              private userService: UserService,private activatedRoute: ActivatedRoute, private authService: AuthService) {
    // 如果未登录，则跳转至 /welcome 页面
    if (this.authService.getPassport() == null)
      this.router.navigate(['/welcome']);
    // 取回文章的信息
    this.activatedRoute.params.subscribe(params => {
      this.article = this.articleService.getArticle(params['id']);
      this.comments = this.article.comments;
    });

    this.user = this.userService.getUserInfo();

    // 设定 marked 的参数
    const renderer = new marked.Renderer();
    renderer.code = (code, language) => {
      const validLang = !!(language && highlightjs.getLanguage(language));
      const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
      return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
    };

    marked.setOptions({ renderer });
  }

  ngOnInit() {
    document.getElementById('article-content').innerHTML = marked(this.article.contents);
  }

  addComment() {
    var message = (<HTMLInputElement>document.getElementById('comment-content')).value;
    var newComment = new Comment('test','.././assets/images/default-avatar.png' , message, '1小时前', 0);
    this.comments.push(newComment);
    var displayDate = new Date().toLocaleDateString();
    console.log(displayDate);
  }

  gotoSignin() {
    this.router.navigate(['/login', 'sign-in']);
  }

}
