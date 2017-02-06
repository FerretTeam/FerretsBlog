import { Component } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [AuthService]
})
export class AppComponent {
  user: User;
  hidden: boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(path => {
      this.user = this.authService.getUserInfo();
    });
    this.hidden = true;
  }

  ngOnInit() { }

  signOut() {
    this.user = this.authService.removeUserInfo();
    // 如果成功退出，则跳转至 /welcome 页面
    if (this.user == null)
      this.router.navigate(['/welcome']);
  }

  login(pageName) {
    this.router.navigate(['/login', pageName]);
  }

  search() {
    this.hidden = false;
  }

  close() {
    this.hidden = true;
  }

}

interface User {
  username: string;
  userAvatarUrl: string;
}
