import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Article, Tag } from '../../services/article/article';
import { ArticleService } from '../../services/article/article.service';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ ArticleService, AuthService ],
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];
  popArticles: Article[] = [];
  tags: Tag[] = [];
  pageNumber: number;
  maxPageNumber: number;
  localPageNumbers: number[] = [];

  constructor(private articleService: ArticleService, private router: Router,
              private authService: AuthService, private userService: UserService) {
    // 如果未登录，则跳转至 /welcome 页面
    if (this.authService.getPassport() == null)
      this.router.navigate(['/welcome']);

    // 获得第 1 页的文章
    this.pageNumber = 1;
    this.articles = this.articleService.getArticles(this.pageNumber);
    this.maxPageNumber = this.articleService.getMaxPageNumber();
    if (this.maxPageNumber > 5) {
      for (let i = 1; i <= 5; i++) this.localPageNumbers.push(i);
    } else {
      for (let i = 1; i <= this.maxPageNumber; i++) this.localPageNumbers.push(i);
    }
    // 获取最热文章
    this.popArticles = this.articleService.getPopularArticles();
    // 获取标签
    this.tags = this.articleService.getTags();
  }

  gotoArticle(id: number) {
    let link = [this.userService.getUserInfo().username, 'article', id];
    this.router.navigate(link);
  }

  turnPage(newPageNumber: number) {
    let newArticles: Article[] = [];
    newArticles = this.articleService.getArticles(newPageNumber);
    if (newArticles != null) {
      this.articles = newArticles;
      this.pageNumber = newPageNumber;
      this.maxPageNumber = this.articleService.getMaxPageNumber();
      // 计算显示在下方的页码有哪些
      this.localPageNumbers = [];
      if (this.pageNumber <= 3) {
        for (let i = 1; i <= Math.min(this.maxPageNumber, 5); i++)
          this.localPageNumbers.push(i);
      } else {
        let count: number = 0;
        for (let i = Math.min(this.maxPageNumber, this.pageNumber + 2); i > 0; i--) {
          this.localPageNumbers.push(i);
          count++;
          if (count >= 5) break;
        }
        this.localPageNumbers.reverse();
      }
      window.scrollTo(0, 0);
    }
  }

  ngOnInit() {
  }

}
