import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import * as marked from 'marked';
import highlightjs from 'highlight.js';

import { Article, Comment } from '../../services/article/article';
import { ArticleService } from '../../services/article/article.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass'],
  providers: [ArticleService, AuthService]
})
export class ArticleComponent implements OnInit {
  article: Article;
  data: string;
  comments: Comment[];

  constructor(private articleService: ArticleService, private router: Router,
              private activatedRoute: ActivatedRoute, private authService: AuthService) {
    // 如果未登录，则跳转至 /welcome 页面
    if (this.authService.getPassport() == null)
      this.router.navigate(['/welcome']);
    // 取回文章的信息
    this.activatedRoute.params.subscribe(params => {
      this.article = this.articleService.getArticle(params['id']);
      this.comments = this.articleService.getComments(params['id']);
    });

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

}
