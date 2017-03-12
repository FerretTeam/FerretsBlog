import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as marked from 'marked';
import highlightjs from 'highlight.js';
import { MdSnackBar } from '@angular/material';

import { Article } from '../../services/article/article';
import { ArticleService } from '../../services/article/article.service';
import { AuthService } from '../../services/auth/auth.service';
import { Passport } from '../../services/auth/passport';
import { Validator } from '../../services/article/validator';

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
  tagInputVisibility: boolean = true;  // tag 是否可见
  originalTitle: string = '';  // 用于存储旧的文章标题以便后端索引
  selectedTextStart: number;  // 编辑文章页面 textarea 被选中的文字的起点
  selectedTextEnd: number;  // 编辑文章页面 textarea 被选中的文字的终点

  validator: Validator = new Validator();  // 文章的校验器
  errorMessage: string = '';  // 报错信息

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              public snackBar: MdSnackBar,private articleService: ArticleService,
              private authService: AuthService) {
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

    if (this.param) {
      // 取回文章
      this.update = true;
      this.articleService.getArticle(this.passport.username, this.param).subscribe((data) => {
        if (data != null) {
          this.article = data;
          // 设置文章标题
          (<HTMLInputElement>document.getElementById('article-title')).value = this.article.title;
          this.originalTitle = this.article.title;
          // 设置文章内容
          document.getElementById('content-before').innerHTML = this.article.contents;
          // 设置文章封面图片
          this.imageUrl = this.article.image;
          // 设置文章的摘要
          (<HTMLInputElement>document.getElementById('digest-content')).value = this.article.synopsis;
          // 设置文章标签
          this.tags = this.article.tagName;
        }
      });
    }
  }

  // 文章内容被选中时触发
  select(start, end) {
    this.selectedTextStart = start;
    this.selectedTextEnd = end;
  }

  // 富文本的功能实现
  bold() {  // 加粗
    let textarea = <HTMLInputElement>document.getElementById('content-before');
    textarea.value = textarea.value.substring(0, this.selectedTextStart) + '**' +
                     textarea.value.substring(this.selectedTextStart, this.selectedTextEnd) +
                     '**' + textarea.value.substring(this.selectedTextEnd);
  }
  italic() {  // 加斜
    let textarea = <HTMLInputElement>document.getElementById('content-before');
    textarea.value = textarea.value.substring(0, this.selectedTextStart) + '*' +
                     textarea.value.substring(this.selectedTextStart, this.selectedTextEnd) +
                     '*' + textarea.value.substring(this.selectedTextEnd);
  }
  quote() {  // 引用
    let textarea = <HTMLInputElement>document.getElementById('content-before');
    textarea.value = textarea.value.substring(0, this.selectedTextStart) + '```' +
                     textarea.value.substring(this.selectedTextStart, this.selectedTextEnd) +
                     '```' + textarea.value.substring(this.selectedTextEnd);
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
      // 删除空格
      newValue = newValue.replace(/\s+/g, '');
      if (newValue.length > 0 && this.tags.length < 3) {
        // 检验标签是否重复
        for (let i = 0; i < this.tags.length; i++)
          if (this.tags[i] == newValue) {
            this.tagInputValue = '';
            return;
          }
        // 取出字符串放入标签
        this.tags.push(newValue);
        // 将输入清空
        this.tagInputValue = '';
        // 判断标签数是否已达到三
        if (this.tags.length >= 3) this.tagInputVisibility = false;
      }
      // 将输入清空
      this.tagInputValue = '';
    }
  }

  tagInputBlur(event) {
    let newValue = event.srcElement.value;
    // 删除空格
    newValue = newValue.replace(/\s+/g, '');
    if (newValue.length > 0 && this.tags.length < 3) {
      // 检验标签是否重复
      for (let i = 0; i < this.tags.length; i++)
        if (this.tags[i] == newValue) {
          this.tagInputValue = '';
          return;
        }
      // 取出字符串放入标签
      this.tags.push(newValue);
      // 将输入清空
      this.tagInputValue = '';
      // 判断标签数是否已达到三
      if (this.tags.length >= 3) this.tagInputVisibility = false;
    }
    // 将输入清空
    this.tagInputValue = '';
  }

  // 发表新文章
  submitArticle() {
    var articleTitle =   (<HTMLInputElement>document.getElementById('article-title')).value;
    if ( articleTitle == '') {
      this.errorMessage = '标题不能为空';
    } else {
      let newArticle: Article = new Article(new Date(), this.imageUrl, articleTitle,
                                            (<HTMLInputElement>document.getElementById('digest-content')).value,
                                            this.tags, (<HTMLInputElement>document.getElementById('content-before')).value);
      // 对文章内容进行前端校验
      this.errorMessage = this.validator.checkArticle(newArticle);
      if (this.errorMessage != '')
        return;
      this.articleService.createArticle(newArticle).subscribe(
        (data) => {
          if (data == 'true') {
            this.snackBar.open('发布成功', '知道了', { duration: 2000 });
            this.errorMessage = '';
            this.router.navigate([this.passport.username, 'home', 0]);
          } else {
            this.errorMessage = data;
          }
        });
    }
  }

  // 更新文章
  updateArticle() {
    var articleTitle =   (<HTMLInputElement>document.getElementById('article-title')).value;
    if (articleTitle == '') {
      this.errorMessage = '标题不能为空';
    } else {
      let newArticle: Article = new Article(new Date(), this.imageUrl, articleTitle,
                                            (<HTMLInputElement>document.getElementById('digest-content')).value,
                                            this.tags, (<HTMLInputElement>document.getElementById('content-before')).value);
      // 对文章内容进行前端校验
      this.errorMessage = this.validator.checkArticle(newArticle);
      if (this.errorMessage != '')
        return;
      this.articleService.updateArticle(newArticle, this.originalTitle).subscribe((data) => {
        if (data == 'true') {
          this.snackBar.open('更新成功', '知道了', { duration: 2000 });
          this.errorMessage = '';
          this.router.navigate([this.passport.username, 'home', 0]);
        } else {
          this.errorMessage = data;
        }
      });
    }
  }

  ngOnInit() {}

}
