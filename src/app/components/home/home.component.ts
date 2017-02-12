import { Component, OnInit } from '@angular/core';
import { Article } from '../../services/article/article';
import { Router } from '@angular/router';

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
  tags: Tag[] = [];

  constructor(private articleService: ArticleService, private router: Router, private authService: AuthService) {
    // 如果未登录，则跳转至 /welcome 页面
    if (this.authService.getUserInfo() == null)
      this.router.navigate(['/welcome']);

    this.articles = this.articleService.getArticles();
    // 遍历文章统计标签
    for (let article of this.articles) {
      let isExist: boolean = false;
      for (let tag of this.tags)
        if (tag.tagName == article.tagName) {
          tag.number++;
          isExist = true;
          break;
        }
      if (!isExist)
        this.tags.push(new Tag(article.tagName, 1));
    }
    this.tags.sort();
  }

  gotoArticle(id: number) {
    let link = ['/article', id];
    this.router.navigate(link);
  }

  ngOnInit() {
  }
}

export class Tag {
  tagName: string;
  number: number;
  constructor(tagName: string, number: number) {
    this.tagName = tagName;
    this.number = number;
  }
}
