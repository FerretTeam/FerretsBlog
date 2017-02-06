import { Component, OnInit } from '@angular/core';
import { Article } from './article';
import { ArticleService } from '../../services/article/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {
  articles: Article[];

  constructor(private articleService: ArticleService) {
    this.articles = this.articleService.getArticles();
  }

  ngOnInit() { }

}
