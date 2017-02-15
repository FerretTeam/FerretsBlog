import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Article, Tag } from '../../services/article/article';
import { ArticleService } from '../../services/article/article.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ ArticleService ],
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];
  popArticles: Article[] = [];
  tags: Tag[] = [];
  pageNumber: number;
  maxPageNumber: number;

  constructor(private articleService: ArticleService, private router: Router,
              private authService: AuthService) {
    // 如果未登录，则跳转至 /welcome 页面
    if (this.authService.getUserInfo() == null)
      this.router.navigate(['/welcome']);

    // 获得第 1 页的文章
    this.pageNumber = 1;
    this.articles = this.articleService.getArticles(this.pageNumber);
    this.maxPageNumber = this.articleService.getMaxPageNumber();
    // 获取最热文章
    this.popArticles = this.articleService.getPopularArticles();
    // 获取标签
    this.tags = this.articleService.getTags();
  }

  ngOnInit() {}

  gotoArticle(id: number) {
    let link = ['/article', id];
    this.router.navigate(link);
  }

  turnPage(dir: number) {
    let newPageNumber: number = this.pageNumber + dir;
    let newArticles: Article[] = [];
    newArticles = this.articleService.getArticles(newPageNumber);
    if (newArticles != null) {
      this.articles = newArticles;
      this.pageNumber = newPageNumber;
      window.scrollTo(0, 0);
    }
  }

}
