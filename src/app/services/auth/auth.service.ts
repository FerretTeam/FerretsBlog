import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Passport } from './passport';
import { Md5 } from 'ts-md5/dist/md5';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  // 加密密码
  encryptPassword(password: string) {
    let temp: string = password;
    for (let i = 0; i < 5; i++)
      temp = String(Md5.hashStr(temp));
    return temp;
  }

  // 获取本地凭证
  getPassport() {
    return JSON.parse(localStorage.getItem('passport'));
  }

  // 登录
  signIn(username: string, password: string) {
    // 清空本地缓存
    localStorage.removeItem('passport');
    // 创建新的凭证
    let passport: Passport = new Passport(username, this.encryptPassword(password));
    // 将凭证发往后端进行校验，成功则将其缓存到本地
    this.http.post('/api/sign-in', JSON.stringify(passport), {headers: this.headers})
             .toPromise()
             .then((res) => {
               if (res.json() == 'true') localStorage.setItem('passport', JSON.stringify(passport));
             });
    // 若缓存成功则登录成功，反之则没有
    if (JSON.parse(localStorage.getItem('passport')) != null) return true;
    else return false;
  }

  // 登出
  signOut() {
    // 清空本地缓存
    localStorage.removeItem('passport');
    return true;
  }

}
