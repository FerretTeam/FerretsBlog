import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {
    let user = {
      username: 'Ren',
      userAvatarUrl: 'assets/images/user-avatar.jpg'
    };
    localStorage.setItem('user-info', JSON.stringify(user));
  }

  // 获取存储在本地的用户信息
  getUserInfo() {
    return JSON.parse(localStorage.getItem('user-info'));
  }

  // 删除存储在本地的用户信息，正常情况下返回 null
  removeUserInfo() {
    localStorage.removeItem('user-info');
    return JSON.parse(localStorage.getItem('user-info'));
  }

}
