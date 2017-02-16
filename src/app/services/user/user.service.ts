import { Injectable } from '@angular/core';
import { User } from './user';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  // 假数据
  user: User;

  constructor(private authService: AuthService) {
    this.user = new User(1, 'An0nym6', '0_0@liuren.link', 'assets/images/user-avatar.jpg',
                         '9281', '2.3k', '503', '', '');
  }

  // 获取用户信息
  getUserInfo() {
    // TODO 将 authService.getPassport() 和获取请求一并发往服务器
    return this.user;
  }

  updateUser(user) {
    // TODO 将 authService.getPassport() 和更新请求一并发往服务器
    this.user = user;
    return this.user;
  }

}
