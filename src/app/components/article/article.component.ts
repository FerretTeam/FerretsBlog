import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';

import { Article } from '../../services/article/article';
import { ArticleService } from '../../services/article/article.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {
  article: Article;

  constructor(private articleService: ArticleService, private router: Router,
              private activatedRoute: ActivatedRoute, private authService: AuthService) {
    // 如果未登录，则跳转至 /welcome 页面
    if (this.authService.getUserInfo() == null)
      this.router.navigate(['/welcome']);
    // 取回文章的信息
    this.activatedRoute.params.subscribe(params => {
      this.article = this.articleService.getArticle(params['id']);
    });
  }

  ngOnInit() {
  }

}
