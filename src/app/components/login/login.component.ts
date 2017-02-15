import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../services/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(private router: Router, private route: ActivatedRoute,
              private authService: AuthService) {}

  signIn() {
    this.user = this.authService.getUserInfo();
    if (this.user != null) {
      this.router.navigate(['/home']);
    }
  }

  login(pageName) {
    this.router.navigate(['/login', pageName]);
  }
}
