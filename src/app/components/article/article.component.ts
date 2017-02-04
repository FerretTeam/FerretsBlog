import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  providers: [ PostsService ],
  styleUrls: ['./article.component.sass']
})
export class ArticleComponent implements OnInit {
  articles : Article[];

  constructor(private postsService: PostsService) {
    this.postsService.getPosts().subscribe(articles=> {
      this.articles = articles;
    })
  }

  ngOnInit() {
  }

}

interface Article {
  id: number;
  title: string;
  body: string;
}
