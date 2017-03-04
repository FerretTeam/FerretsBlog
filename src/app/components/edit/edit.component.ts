import { Component, OnInit } from '@angular/core';
import * as marked from 'marked';
import highlightjs from 'highlight.js';
import { Article } from '../../services/article/article';
import { ArticleService } from '../../services/article/article.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  param: number;  // URL 参数的个数
  update: boolean;  // 创建新的文章还是更新文章
  mode: string;  // 编辑文章还是预览文章

  article: Article;  // 显示的文章
  imageurl: string;  // 背景图片

  constructor(private articleService: ArticleService, private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.mode = '预 览';
    this.update = false;
    this.imageurl = null;

    // 设定 marked 的参数
    const renderer = new marked.Renderer();
    renderer.code = (code, language) => {
      const validLang = !!(language && highlightjs.getLanguage(language));
      const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
      return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
    };

    marked.setOptions({ renderer });

    // 读取文章的编号
    this.activatedRoute.params.subscribe(params => {
      this.param = params['id'];
    });
  }

  ngOnInit() {
    if (this.param) {
      // 取回文章
      this.update = true;
      this.article = this.articleService.getArticle(this.param);
      (<HTMLInputElement>document.getElementById('article-title')).value = this.article.title;
      document.getElementById('content-before').innerHTML = this.article.contents;
      this.imageurl = this.article.image;
    }
  }

  contentChange() {
    if (this.mode == '预 览') this.mode = '编 写';
    else this.mode = '预 览';
    document.getElementById('content-after').innerHTML = marked(document.getElementById('content-before').innerHTML);
    var element  = document.getElementById('content-after');
    if(element.className == "markdown-body content-after"){
        element.className += ' content-after-active';
    }else{
        element.className = 'markdown-body content-after';
    }
  }

  imageChange(event) {
    var reader = new FileReader();
    var that = this;

    reader.onload = function(e: any) {
      that.imageurl = e.target.result;
    };

    if (event.target.files[0] != undefined)
      reader.readAsDataURL(event.target.files[0]);
  }

  removeCurrentImage() {
    this.imageurl = null;
  }

  submitArticle() {
    // TODO 提交文章
  }

  updateArticle() {
    // TODO 更新文章
  }

}
