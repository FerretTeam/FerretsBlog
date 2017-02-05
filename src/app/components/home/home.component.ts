import { Component, OnInit } from '@angular/core';
import { Article } from '../article/article';
import { ArticleService } from '../../services/article/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ ArticleService ],
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  article: Article[] = [];

  constructor(private articleService: ArticleService) {
    this.articleService.getArticle().subscribe(article => {
      this.article = article.slice(0,10);
    });
  }

  ngOnInit() {
  }

}
