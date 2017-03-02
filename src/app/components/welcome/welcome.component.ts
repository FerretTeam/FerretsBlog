import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService,
              private userService: UserService) {
    if (this.authService.getPassport() != null)
      this.userService.getUserInfo().subscribe((data) => {
        this.router.navigate([data.username, 'home', 1]);
      });
  }

  ngOnInit() {}

  login() {
    this.router.navigate(['/login/sign-up']);
  }

}
