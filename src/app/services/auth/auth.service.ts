import { Injectable } from '@angular/core';
import { Passport } from './passport';

@Injectable()
export class AuthService {

  constructor() {}

  // 加密密码
  encryptPassword(password: string) {
    // TODO 实现密码的加密
    return password;
  }

  // 获取本地凭证
  getPassport() {
    return JSON.parse(localStorage.getItem('passport'));
  }

  // 登入
  signIn(username: string, password: string) {
    let passport: Passport = new Passport(username, this.encryptPassword(password));
    // TODO 将生成的凭证上传验证
    localStorage.setItem('passport', JSON.stringify(passport));
    return true;
  }

  // 登出
  signOut() {
    localStorage.removeItem('passport');
    return true;
  }

}
