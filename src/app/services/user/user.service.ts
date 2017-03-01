import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AuthService } from '../auth/auth.service';
import { Passport } from '../auth/passport';
import { User } from './user';

@Injectable()
export class UserService {
  private headers = new Headers({'Content-Type': 'application/json'});

  // 假数据
  user: User;

  constructor(private http: Http, private authService: AuthService) {
    this.user = new User(1, 'An0nym6', '0_0@liuren.link', '/assets/images/user-avatar.jpg',
                         '9281', '2.3k', '503', '', '');
  }

  // 创建新的用户
  createNewUser(username: string, email: string) {
    let passport: Passport = this.authService.getPassport();
    if (passport != null) {
      // 将用户信息发往后端创建一个新的用户
      return this.http.post('/api/create-user',
                            {passport: JSON.stringify(passport), username: username, email: email},
                            {headers: this.headers})
                      .map(res => res.json());
    }
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
