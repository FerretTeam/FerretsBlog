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
  errorMessage: string = '';
  validator: Validator = new Validator();

  constructor(private router: Router, private authService: AuthService,
              private userService: UserService, public snackBar: MdSnackBar) {
    // 进入这个页面则退出当前登录
    this.authService.signOut();
    // 页面发生变化时清空报错和 input 的访问记录
    this.router.events.subscribe(path => {
      this.errorMessage = '';
      this.validator.clearVisits();
    });
  }

  ngOnInit() {}

  signInValidator(formData, inputId) {
    this.errorMessage = this.validator.signInValidator(formData, inputId);
  }

  signInCheck(formData) {
    // 用户名密码须通过校验
    this.signInValidator(formData, -1);
    if (this.errorMessage != '') return;

    this.user = null;
    // 调用 service 登录，登录成功则获取用户信息
    this.authService.signIn(formData.username, formData.password).subscribe(
      (data) => {
        if (data == 'true') {
          if (this.authService.getPassport() != null) {
            this.userService.getUserInfo().subscribe((data_) => {
              this.user = data_;
              // 如果成功登录，则路由至 home，否则报错
              if (this.user != null) {
                this.snackBar.open('登录成功', '知道了', { duration: 2000 });
                this.router.navigate([this.user.username, 'home', 1]);
              }
            });
          }
        } else {
          this.authService.signOut();
          this.errorMessage = data;
        }
      }
    );
  }

  signUpValidator(formData, inputId) {
    this.errorMessage = this.validator.signUpValidator(formData, inputId);
  }

  signUpCheck(formData) {
    // 上传的信息必须通过校验
    this.signUpValidator(formData, -1);
    if (this.errorMessage != '') return;

    this.user = null;
    // 调用 service 注册，注册成功则获取用户信息
    this.authService.signUp(formData.username_, formData.email_, formData.password_).subscribe(
      (data) => {
        if (data == 'true') {
          if (this.authService.getPassport() != null) {
            this.userService.getUserInfo().subscribe((data_) => {
              this.user = data_;
              // 如果成功注册，则路由至登录页面，否则报错
              if (this.user != null) {
                this.snackBar.open('注册成功', '知道了', { duration: 2000 });
                this.authService.signOut();
                this.router.navigate(['/login', 'sign-in']);
              }
            });
          }
        } else {
          this.authService.signOut();
          this.errorMessage = data;
        }
      }
    );
  }

  login(pageName) {
    this.router.navigate(['/login', pageName]);
  }
}
