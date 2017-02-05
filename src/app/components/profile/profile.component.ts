import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})

export class ProfileComponent{
  user: user;

  constructor(private router: Router, private authService: AuthService) {
    // 如果未登录，则跳转至 /welcome 页面
    if (this.authService.getUserInfo() == null)
      this.router.navigate(['/welcome']);

    this.user = {
      name: 'Shu Qian',
      age: 20,
      occupation: 'Student',
      rate : 10
    }
  }

}

interface user {
  name: string;
  age: number;
  occupation: string;
  rate: number;
}
