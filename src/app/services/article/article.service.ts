import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService {

  constructor(private http: Http) { }

  getArticle() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/1')
    .map(res => res.json());
  }
}
