import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [AuthService]
})
export class AppComponent {
  user: User;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUserInfo();
  }

  ngOnInit() { }

}

interface User {
  username: string;
  userAvatarUrl: string;
}
