import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable()
export class AuthService {
  user: User = {
    username: 'An0nym6',
    email: '0_0@liuren.link',
    userAvatarUrl: 'assets/images/user-avatar.jpg',
    totalCharacters: '9281',
    totalReading: '2.3k',
    totalLikes: '503'
  }

  constructor() {}

  // 获取存储在本地的用户信息
  getUserInfo() {
    return JSON.parse(localStorage.getItem('user-info'));
  }

  // 删除存储在本地的用户信息，正常情况下返回 null
  removeUserInfo() {
    localStorage.removeItem('user-info');
    return JSON.parse(localStorage.getItem('user-info'));
  }

  // 验证用户合法性，TODO: 实现用户合法性的安全验证
  checkUser() {
    localStorage.setItem('user-info', JSON.stringify(this.user));
    return JSON.parse(localStorage.getItem('user-info'));
  }

  // 更新用户信息，TODO: 更新云端的用户信息，注意信息的合法性校验
  updateUser(user) {
    this.user = user;
    localStorage.setItem('user-info', JSON.stringify(this.user));
    return JSON.parse(localStorage.getItem('user-info'));
  }

}
