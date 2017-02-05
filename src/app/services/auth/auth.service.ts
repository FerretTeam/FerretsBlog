import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {
    let user = {
      username: 'Ren',
      userAvatarUrl: 'assets/images/user-avatar.jpg'
    };
    localStorage.setItem('user-info', JSON.stringify(user));
    // localStorage.removeItem('user-info');
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('user-info'));
  }

}
