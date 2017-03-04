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
    this.user = new User('An0nym6', '0_0@liuren.link', '/assets/images/user-avatar.jpg',
                         '9281', '2.3k', '503', '', '');
  }

  // 获取用户信息
  getUserInfo() {
    let passport = this.authService.getPassport();
    return this.http.post('/api/get-user', JSON.stringify(passport), {headers: this.headers})
                    .map((res) => {
                      let temp = res.json();
                      if (temp == 'INVALID_REQUEST' || temp.username == undefined) {
                        console.error(temp);
                        return null;
                      }
                      // 为了排版便利，在 service 中将大数转换为 k 或 m
                      let tempTotalCharacters: string, tempTotalReading: string, tempTotalLikes: string;
                      if (temp.totalCharacters > 1000000)
                        tempTotalCharacters = String((temp.totalCharacters / 1000000).toFixed(1)) + 'm';
                      else if (temp.totalCharacters > 1000)
                        tempTotalCharacters = String((temp.totalCharacters / 1000).toFixed(1)) + 'k';
                      else
                        tempTotalCharacters = String(temp.totalCharacters);
                      if (temp.totalReading > 1000000)
                        tempTotalReading = String((temp.totalReading / 1000000).toFixed(1)) + 'm';
                      else if (temp.totalReading > 1000)
                        tempTotalReading = String((temp.totalReading / 1000).toFixed(1)) + 'k';
                      else
                        tempTotalReading = String(temp.totalReading);
                      if (temp.totalLikes > 1000000)
                        tempTotalLikes = String((temp.totalLikes / 1000000).toFixed(1)) + 'm';
                      else if (temp.totalLikes > 1000)
                        tempTotalLikes = String((temp.totalLikes / 1000).toFixed(1)) + 'k';
                      else
                        tempTotalLikes = String(temp.totalLikes);

                      // 创建新的用户
                      return new User(temp.username, temp.email, temp.userAvatarUrl,
                                      tempTotalCharacters, tempTotalReading, tempTotalLikes,
                                      temp.introduction, temp.field);
                    });
  }

  updateUser(user) {
    // TODO 将 authService.getPassport() 和更新请求一并发往服务器
    this.user = user;
    return this.user;
  }

}
