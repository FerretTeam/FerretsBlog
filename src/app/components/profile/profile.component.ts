import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { User } from '../../services/user/user';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { Validator } from '../../services/user/validator';
import { Article } from '../../services/article/article';
import { ArticleService } from '../../services/article/article.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})

export class ProfileComponent{
  user: User = null;
  articles: Article[] = null;
  errorMessage: string = '';
  validator: Validator = new Validator();

  constructor(private router: Router, private authService: AuthService,
              public snackBar: MdSnackBar, private userService: UserService,
              private articleService: ArticleService) {
    // 如果未登录，则跳转至 /welcome 页面
    if (this.authService.getPassport() == null) {
      this.router.navigate(['/welcome']);
    } else {
      this.userService.getUserInfo().subscribe(data => {
        this.user = data;
        this.articleService.getArticlesByPageNumber(this.user.username, 0).subscribe(data => this.articles = data);
      });
    }
  }

  updateUserInfo(formData) {
    this.user.email = formData.email;
    this.user.introduction = formData.introduction;
    this.user.field = formData.field;
    // 提交修改
    let errorMessage = this.validator.checkUserInfo(this.user.userAvatarUrl,
                                                    this.user.email);
    if (errorMessage != '') {
      this.errorMessage = errorMessage;
      return;
    }
    this.userService.updateUser(this.user).subscribe(
      (data) => {
        if (data.username != undefined) {
          this.user = data;
          this.snackBar.open('修改成功', '知道了', { duration: 2000 });
          this.errorMessage = '';
        } else {
          this.errorMessage = data;
        }
      }
    );
  }

  avatarChange(event) {
    var reader = new FileReader();
    var that = this;

    reader.onload = function(e: any) {
      that.user.userAvatarUrl = e.target.result;
    };

    if (event.target.files[0] != undefined)
      reader.readAsDataURL(event.target.files[0]);
  }

  getDateString(date: Date) {
    let jsDate = new Date(date);
    return jsDate.getFullYear() + ' 年 ' + jsDate.getMonth() + ' 月 ' +
           jsDate.getDate() + ' 日';
  }

  deleteArticle(article: Article) {
    var index = this.articles.indexOf(article);
    if (index > -1) {
      this.articles.splice(index, 1);
      this.articleService.deleteArticle(article.title).subscribe();
    }
  }

  gotoEdit() {
    if (this.user != null)
      this.router.navigate([this.user.username, 'edit']);
  }
}
