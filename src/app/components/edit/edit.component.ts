import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as marked from 'marked';
import highlightjs from 'highlight.js';

import { Article } from '../../services/article/article';
import { ArticleService } from '../../services/article/article.service';
import { AuthService } from '../../services/auth/auth.service';
import { Passport } from '../../services/auth/passport';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  passport: Passport;  // 用户凭证

  param: string;  // URL 中的文章标题
  update: boolean;  // 创建新的文章还是更新文章
  mode: string;  // 编辑文章还是预览文章

  article: Article;  // 显示的文章
  imageUrl: string = '';  // 背景图片
  tags: string[] = [];  // 文章标签
  tagInputValue: string;  // 文章标签的字符串缓冲
  tagInputVisibility: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private articleService: ArticleService, private authService: AuthService) {
    this.mode = '预 览';
    this.update = false;
    this.imageUrl = null;

    // 如果未登录，则跳转至 /welcome 页面
    this.passport = this.authService.getPassport();
    if (this.passport == null)
      this.router.navigate(['/welcome']);

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
      this.param = params['title'];
    });
  }

  ngOnInit() {
    if (this.param) {
      // 取回文章
      this.update = true;
      this.articleService.getArticle(this.passport.username, this.param).subscribe((data) => {
        if (data != null) {
          this.article = data;
          // 设置文章标题
          (<HTMLInputElement>document.getElementById('article-title')).value = this.article.title;
          // 设置文章内容
          document.getElementById('content-before').innerHTML = this.article.contents;
          // 设置文章封面图片
          this.imageUrl = this.article.image;
          // TODO 设置文章标签和简介
        }
      });
    }
  }

  contentChange() {
    if (this.mode == '预 览') this.mode = '编 写';
    else this.mode = '预 览';
    document.getElementById('content-after').innerHTML = marked((<HTMLInputElement>document.getElementById('content-before')).value);
    var element  = document.getElementById('content-after');
    if (element.className == 'markdown-body content-after'){
        element.className += ' content-after-active';
    } else {
        element.className = 'markdown-body content-after';
    }
  }

  imageChange(event) {
    var reader = new FileReader();
    var that = this;

    reader.onload = function(e: any) {
      that.imageUrl = e.target.result;
    };

    if (event.target.files[0] != undefined)
      reader.readAsDataURL(event.target.files[0]);
  }

  removeCurrentImage() {
    this.imageUrl = null;
  }

  deleteTag(index: number) {
    this.tags.splice(index, 1);
    if (this.tags.length <= 3) this.tagInputVisibility = true;
  }

  tagInputChange(newValue) {
    if (newValue != undefined && newValue.length > 1 && newValue[newValue.length - 1] == ' ') {
      // 取出字符串放入标签
      this.tags.push(newValue.substr(0, newValue.length - 1));
      // 将输入清空
      this.tagInputValue = '';
      // 判断标签数是否已达到三
      if (this.tags.length >= 3) this.tagInputVisibility = false;
    }
  }

  submitArticle() {
    let newArticle: Article = new Article(new Date(), this.imageUrl,
                                          (<HTMLInputElement>document.getElementById('article-title')).value,
                                          (<HTMLInputElement>document.getElementById('digest-content')).value,
                                          this.tags, (<HTMLInputElement>document.getElementById('content-before')).value);
    this.articleService.createArticle(newArticle).subscribe(data => data);
  }

  updateArticle() {
    // TODO 更新文章
  }

}
