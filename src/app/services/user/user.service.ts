import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AuthService } from '../auth/auth.service';
import { Passport } from '../auth/passport';
import { User } from './user';

@Injectable()
export class UserService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private authService: AuthService) {}

  // 为了排版便利，在 service 中将大数转换为 k 或 m
  numberToString(num: number) {
    if (num > 1000000)
      return String((num / 1000000).toFixed(1)) + 'm';
    else if (num > 1000)
      return String((num / 1000).toFixed(1)) + 'k';
    else
      return String(num);
  }

  // 获取用户信息
  getUserInfo() {
    let passport = this.authService.getPassport();
    return this.http.post('/api/get-user', passport, {headers: this.headers})
                    .map((res) => {
                      let temp = res.json();
                      if (temp == 'INVALID_REQUEST' || temp.username == undefined) {
                        console.error(temp);
                        return null;
                      }
                      // 创建新的用户
                      return new User(temp.username, temp.email, temp.userAvatarUrl,
                                      this.numberToString(temp.totalCharacters),
                                      this.numberToString(temp.totalReading),
                                      this.numberToString(temp.totalLikes),
                                      temp.introduction, temp.field);
                    });
  }

  // 更新用户信息
  updateUser(user) {
    let passport = this.authService.getPassport();
    return this.http.post('/api/update-user',
                          {passport: passport, userAvatarUrl: user.userAvatarUrl,
                           email: user.email, introduction: user.introduction,
                           field: user.field},
                          {headers: this.headers})
                    .map((res) => {
                      let temp = res.json();
                      if (temp == 'INVALID_REQUEST' || temp.username == undefined) {
                        return temp;
                      }
                      // 为了排版便利，在 service 中将大数转换为 k 或 m
                      let tempTotalCharacters: string, tempTotalReading: string, tempTotalLikes: string;
                      tempTotalCharacters = this.numberToString(temp.totalCharacters);
                      tempTotalReading = this.numberToString(temp.totalReading);
                      tempTotalLikes = this.numberToString(temp.totalLikes);
                      // 创建新的用户
                      return new User(temp.username, temp.email, temp.userAvatarUrl,
                                      this.numberToString(temp.totalCharacters),
                                      this.numberToString(temp.totalReading),
                                      this.numberToString(temp.totalLikes),
                                      temp.introduction, temp.field);
                    });
  }

}
