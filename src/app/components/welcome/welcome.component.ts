import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
    // 如果已登录，则跳转至 /home 页面
    if (this.authService.getUserInfo()) this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
