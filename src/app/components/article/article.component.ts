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
  data: string;
  comments: Comment[];
  user: User;

  constructor(private articleService: ArticleService, private router: Router,
              public snackBar: MdSnackBar, private userService: UserService,
              private activatedRoute: ActivatedRoute, private authService: AuthService) {
    // 取回文章的信息
    this.activatedRoute.params.subscribe(params => {
      this.articleService.getArticle(params['user'], params['title']).subscribe(data => this.article = data);
      this.comments = this.articleService.getComments(params['user'], params['title']);
    });

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
  }

  ngOnInit() {
    document.getElementById('article-content').innerHTML = marked(this.article.contents);
  }

  addComment() {
    var message = (<HTMLInputElement>document.getElementById('comment-content')).value;
    var newComment = new Comment(this.user.username, this.user.userAvatarUrl, message, '刚刚', '0');
    this.comments.push(newComment);
    this.snackBar.open('发布成功', '知道了', { duration: 2000 });
    // TODO 将评论与时间关联
    // var displayDate = new Date().toLocaleDateString();
  }

  gotoSignIn() {
    this.router.navigate(['/login', 'sign-in']);
  }

}
