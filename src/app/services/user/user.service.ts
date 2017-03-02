import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

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

  // 获取用户信息
  getUserInfo() {
    // TODO 从后端获取用户信息
    // let passport = this.authService.getPassport();
    // return this.http.post('/api/get-user', JSON.stringify(passport), {headers: this.headers})
    //                 .map((res) => res.json());
    return this.user;
  }

  updateUser(user) {
    // TODO 将 authService.getPassport() 和更新请求一并发往服务器
    this.user = user;
    return this.user;
  }

}
