import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Passport } from './passport';
import { Md5 } from 'ts-md5/dist/md5';

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
    // 创建新的凭证并存入本地（若登录失败将在调用处调用 signOut() 删除）
    let passport: Passport = new Passport(username, this.encryptPassword(password));
    localStorage.setItem('passport', JSON.stringify(passport));
    // 将凭证发往后端进行校验，成功则将其缓存到本地
    return this.http.post('/api/sign-in', JSON.stringify(passport), {headers: this.headers})
                    .map((res) => res.json());
  }

  // 登出
  signOut() {
    // 清空本地缓存
    localStorage.removeItem('passport');
    return true;
  }

  // 注册
  signUp(username: string, email:string, password: string) {
    // 清空本地缓存
    localStorage.removeItem('passport');
    // 创建新的凭证并存入本地（若注册失败将在调用处调用 signOut() 删除）
    let passport: Passport = new Passport(username, this.encryptPassword(password));
    localStorage.setItem('passport', JSON.stringify(passport));
    // 将凭证发往后端进行注册，成功则将其缓存到本地
    return this.http.post('/api/sign-up', JSON.stringify(passport), {headers: this.headers})
                    .map(res => res.json());
  }

}
