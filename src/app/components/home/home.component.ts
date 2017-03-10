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

  username: string = '';

  constructor(private articleService: ArticleService, private router: Router,
              private authService: AuthService, private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    // 如果未登录，则跳转至 /welcome 页面
    let passport = this.authService.getPassport();
    if (passport == null)
      this.router.navigate(['/welcome']);
    else
      this.username = passport.username;

    // URL 发生变化
    this.activatedRoute.params.subscribe(params => {
      // 获取指定页的文章
      this.pageNumber = parseInt(params['page']) + 1;
      this.articleService.getArticlesByPageNumber(this.username, this.pageNumber - 1)
                         .subscribe(data => {
                           this.articles = data;
                         });
      this.articleService.getArticlesNumber(this.username).subscribe(
        (data) => {
          if (data != null) {
            this.maxPageNumber = Math.ceil(Number(data) / 10);
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
          }
        });
    });

    // 获取最热文章
    this.articleService.getPopularArticles().subscribe(data => {
      this.popArticles = data;
    });
    // 获取标签
    this.tags = this.articleService.getTags();
  }

  gotoArticle(title: string) {
    if (this.authService.getPassport() != null) {
      this.userService.getUserInfo().subscribe((data) => {
        let link = [data.username, 'article', title];
        this.router.navigate(link);
      });
    }
  }

  gotoEdit(title: string) {
    if (this.authService.getPassport() != null) {
      this.userService.getUserInfo().subscribe((data) => {
        let link = [data.username, 'edit', title];
        this.router.navigate(link);
      });
    }
  }

  turnPage(newPageNumber: number) {
    if (this.authService.getPassport() != null) {
      this.userService.getUserInfo().subscribe((data) => {
        let link = [data.username, 'home', newPageNumber - 1];
        this.router.navigate(link);
      });
    }
  }

  getDateString(date: Date) {
    let jsDate = new Date(date);
    return jsDate.getFullYear() + ' 年 ' + jsDate.getMonth() + ' 月 ' +
           jsDate.getDate() + ' 日';
  }

  lightUp() {
    let container = document.getElementById('bulb-container')
    if (!container.classList.contains('active'))
      container.className += ' active';
  }

  gotoNewEdit() {
    this.router.navigate([this.username, 'edit']);
  }

  ngOnInit() {}

}
