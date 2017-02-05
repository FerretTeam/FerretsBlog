import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() { }

  login() {
    if (this.authService.checkUser() != null)
      this.router.navigate(['/home']);
  }

}
