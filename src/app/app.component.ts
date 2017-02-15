import { Component, ViewChild } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './services/auth/auth.service';
import { User } from './services/user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [AuthService]
})
export class AppComponent {
  user: User;
  searchInputWidth: number;
  searchCloseButtonOpacity: number;
  @ViewChild('toolbarSearchInput') input;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(path => {
      this.user = this.authService.getUserInfo();
      window.scrollTo(0, 0);
    });
    this.searchInputWidth = 0;
    this.searchCloseButtonOpacity = 0;
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
    this.searchInputWidth = 160;
    this.searchCloseButtonOpacity = 1;
    this.input.nativeElement.focus();
  }

  close() {
    this.searchInputWidth = 0;
    this.searchCloseButtonOpacity = 0;
  }

  gotoProfile() {
    this.router.navigate(['/profile']);
  }

  gotoHome() {
    this.router.navigate(['/']);
  }

}
