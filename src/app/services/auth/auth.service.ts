import { Injectable } from '@angular/core';
import { User } from '../user/user';

@Injectable()
export class AuthService {
  user: User = {
    id: '1',
    username: 'An0nym6',
    password: '',
    email: '0_0@liuren.link',
    userAvatarUrl: 'assets/images/user-avatar.jpg',
    totalCharacters: '9281',
    totalReading: '2.3k',
    totalLikes: '503',
    introduction: '',
    field: ''
 }

  constructor() {}

  // 获取存储在本地的用户信息
  getUserInfo() {
    return JSON.parse(localStorage.getItem('user-info'));
  }

  removeUserInfo() {
    localStorage.removeItem('user-info');
    return JSON.parse(localStorage.getItem('user-info'));
  }

  checkUser() {
    localStorage.setItem('user-info', JSON.stringify(this.user));
    return JSON.parse(localStorage.getItem('user-info'));
  }

  updateUser(user) {
    this.user = user;
    localStorage.setItem('user-info', JSON.stringify(this.user));
    return JSON.parse(localStorage.getItem('user-info'));
  }

}
