import { Component, OnInit } from '@angular/core';
import { Article } from '../article/article';
import { ArticleService } from '../../services/article/article.service';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ ArticleService ],
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  article: Article[] = [];

<<<<<<< HEAD
  constructor(private articleService: ArticleService) {
    this.articleService.getArticle().subscribe(article => {
      this.article = article.slice(0,10);
    });
=======
  constructor(private router: Router, private authService: AuthService) {
    // 如果未登录，则跳转至 /welcome 页面
    if (this.authService.getUserInfo() == null)
      this.router.navigate(['/welcome']);
>>>>>>> origin/master
  }

  ngOnInit() {
  }

}
