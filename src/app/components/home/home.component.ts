import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
              private authService: AuthService, private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    // 如果未登录，则跳转至 /welcome 页面
    if (this.authService.getPassport() == null)
      this.router.navigate(['/welcome']);

    this.activatedRoute.params.subscribe(params => {
      // 获取指定页的文章
      this.pageNumber = parseInt(params['page']);
      this.articles = this.articleService.getArticles(this.pageNumber);
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
    });

    // 获取最热文章
    this.popArticles = this.articleService.getPopularArticles();
    // 获取标签
    this.tags = this.articleService.getTags();
  }

  gotoArticle(id: number) {
    if (this.authService.getPassport() != null) {
      this.userService.getUserInfo().subscribe((data) => {
        let link = [data.username, 'article', id];
        this.router.navigate(link);
      });
    }
  }

  gotoEdit(id: number) {
    if (this.authService.getPassport() != null) {
      this.userService.getUserInfo().subscribe((data) => {
        let link = [data.username, 'edit', id];
        this.router.navigate(link);
      });
    }
  }

  turnPage(newPageNumber: number) {
    if (this.authService.getPassport() != null) {
      this.userService.getUserInfo().subscribe((data) => {
        let link = [data.username, 'home', newPageNumber];
        this.router.navigate(link);
      });
    }
  }

  ngOnInit() {
  }

}
