import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../services/user/user';
import { Validator } from '../../services/auth/validator'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  user: User = null;
  username: string = '';
  errorMessage: string = '';
  validator: Validator = new Validator();

  constructor(private router: Router, private authService: AuthService,
              private userService: UserService, public snackBar: MdSnackBar) {
    // 试图获取用户的用户名
    let temp: User = this.userService.getUserInfo();
    if (temp != null) this.username = temp.username;
    // 进入这个页面则退出当前登录
    this.authService.signOut();
  }

  ngOnInit() {}

  signInValidator(formData) {
    this.errorMessage = this.validator.signInValidator(formData);
  }

  signInCheck(formData) {
    // 用户名密码须通过校验
    this.signInValidator(formData);
    if (this.errorMessage != '') return;

    this.user = null;
    // 调用 service 登录，登录成功则获取用户信息
    this.authService.signIn(formData.username, formData.password).subscribe(
      (data) => {
        if (data == 'true')
          this.user = this.userService.getUserInfo();
        // 如果成功登录，则路由至 home，否则报错
        if (this.user != null) {
          this.snackBar.open('登录成功', '知道了', {
            duration: 2000,
          });
          this.router.navigate([this.user.username, 'home', 1]);
        } else {
          this.authService.signOut();
          this.errorMessage = '登录失败';
        }
      }
    );
  }

  signUpValidator(formData) {
    this.errorMessage = this.validator.signUpValidator(formData);
  }

  signUpCheck(formData) {
    // 上传的信息必须通过校验
    this.signUpValidator(formData);
    if (this.errorMessage != '') return;

    this.user = null;
    // 调用 service 注册，注册成功则获取用户信息
    this.authService.signUp(formData.username_, formData.email_, formData.password_).subscribe(
      (data) => {
        if (data == 'true')
          this.user = this.userService.getUserInfo();
        // 如果成功注册，则路由至 home，否则报错
        if (this.user != null) {
          this.snackBar.open('注册成功', '知道了', {
            duration: 2000,
          });
          this.router.navigate([this.user.username, 'home', 1]);
        } else {
          this.authService.signOut();
          this.errorMessage = '注册失败';
        }
      }
    );
  }

  login(pageName) {
    this.errorMessage = '';
    this.router.navigate(['/login', pageName]);
  }
}
