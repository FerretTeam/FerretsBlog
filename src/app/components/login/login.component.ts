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

  constructor(private router: Router, private authService: AuthService,
              private userService: UserService) {
    // 如果已登录，则跳转至 /home 页面
    if (this.authService.getPassport())
      this.router.navigate(['/home']);
  }

  ngOnInit() {}

  signInCheck() {
    if (this.authService.signIn('', ''))
      this.user = this.userService.getUserInfo();
    if (this.user != null)
      this.router.navigate(['/home']);
  }

  signUpCheck() {}

  login(pageName) {
    this.router.navigate(['/login', pageName]);
  }
}
