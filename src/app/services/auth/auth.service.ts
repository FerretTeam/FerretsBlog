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

  // 登入
  signIn(username: string, password: string) {
    let passport: Passport = new Passport(username, this.encryptPassword(password));

    // TODO 将生成的凭证上传验证
    this.http.post('/api/sign-in', JSON.stringify(passport), {headers: this.headers})
             .toPromise()
             .then(res => console.log(res.json()));

    localStorage.setItem('passport', JSON.stringify(passport));
    return true;
  }

  // 登出
  signOut() {
    localStorage.removeItem('passport');
    return true;
  }

}
