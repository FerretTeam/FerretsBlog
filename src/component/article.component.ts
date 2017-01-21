import {Component} from '@angular/core';

@Component({
  selector: 'my-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  article = 'right!';
}
