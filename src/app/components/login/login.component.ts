import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../services/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  user: User = null;
  username: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService,
              private userService: UserService) {
    // 试图获取用户的用户名
    let temp: User = this.userService.getUserInfo();
    if (temp != null) this.username = temp.username;
    // 进入这个页面则退出当前登录
    this.authService.signOut();
  }

  ngOnInit() {}

  validator(formData) {
    let username = formData.username;
    let password = formData.password;
    let usernameRegex = /^[a-zA-Z0-9]+$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]+$/;
    // 对用户名进行校验
    if (username == null || username == undefined || username == '')
      this.errorMessage = '用户名不能为空';
    else if (username.length < 5 || username.length > 10)
      this.errorMessage = '用户名长度需在 5 到 10 之间';
    else if (username.match(usernameRegex) == null)
      this.errorMessage = '用户名只能由字母和数字组成';
    // 对密码进行校验
    else if (password == null || password == undefined || password == '')
      this.errorMessage = '密码不能为空';
    else if (password.length < 8 || password.length > 20)
      this.errorMessage = '密码长度需在 8 到 20 之间';
    else if (password.match(passwordRegex) == null)
      this.errorMessage = '密码至少需包含一个大写字母、一个小写字母、一个数字和一个特殊字符';

    else
      this.errorMessage = '';
  }

  signInCheck(formData) {
    // 用户名密码须通过校验
    this.validator(formData);
    if (this.errorMessage != '') return;

    this.user = null;
    // 调用 service 登录，登录成功则获取用户信息
    if (this.authService.signIn(formData.username, formData.password))
      this.user = this.userService.getUserInfo();
    // 如果成功登录，则路由至 home，否则报错
    if (this.user != null)
      this.router.navigate([this.user.username, 'home', 1]);
    else
      this.errorMessage = '用户名不存在或密码错误';
  }

  signUpCheck() {}

  login(pageName) {
    this.router.navigate(['/login', pageName]);
  }
}
