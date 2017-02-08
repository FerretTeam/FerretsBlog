import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})

export class ProfileComponent{
  user: User;

  constructor(private router: Router, private authService: AuthService) {
    // 如果未登录，则跳转至 /welcome 页面
    this.user = this.authService.getUserInfo();
    if (this.user == null)
      this.router.navigate(['/welcome']);
  }

}

export class User {
  username: string;
  email: string;
  userAvatarUrl: string;
}
