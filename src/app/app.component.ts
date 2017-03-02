import { Component, ViewChild } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { User } from './services/user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [ AuthService, UserService ]
})
export class AppComponent {
  searchInputWidth: number;
  searchCloseButtonOpacity: number;
  @ViewChild('toolbarSearchInput') input;
  user: User = null;

  constructor(private router: Router, private authService: AuthService,
              private userService: UserService) {
    this.router.events.subscribe(path => {
      if (this.authService.getPassport() != null)
        this.userService.getUserInfo().subscribe(data => this.user = data);
      window.scrollTo(0, 0);
    });
    this.searchInputWidth = 0;
    this.searchCloseButtonOpacity = 0;
  }

  ngOnInit() {}

  signOut() {
    // 如果成功退出，则跳转至 /welcome 页面
    if (this.authService.signOut())
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
    if (this.user != null)
      this.router.navigate([this.user.username, 'profile']);
  }

  gotoHome() {
    if (this.user != null)
      this.router.navigate([this.user.username, 'home', 1]);
    else
      this.router.navigate(['/welcome']);
  }

  gotoEdit() {
    if (this.user != null)
      this.router.navigate([this.user.username, 'edit']);
  }

}
