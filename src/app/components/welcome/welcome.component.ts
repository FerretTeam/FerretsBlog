import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { Passport } from '../../services/auth/passport';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService,
              private userService: UserService) {
    let passport: Passport = this.authService.getPassport();
    if (passport != null)
      this.router.navigate([passport.username, 'home', 0]);
  }

  ngOnInit() {}

  login() {
    this.router.navigate(['/login/sign-up']);
  }

}
