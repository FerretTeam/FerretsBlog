import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
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
    let user = {
      username: 'Ren',
      userAvatarUrl: 'assets/images/user-avatar.jpg'
    };
    localStorage.setItem('user-info', JSON.stringify(user));
    return JSON.parse(localStorage.getItem('user-info'));
  }

}
