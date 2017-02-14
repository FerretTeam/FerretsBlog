import { Injectable } from '@angular/core';

import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  user: User = {
    id: '1',
    username: 'An0nym6',
    password: '',
    email: '0_0@liuren.link',
    userAvatarUrl: 'assets/images/user-avatar.jpg',
    totalCharacters: '9281',
    totalReading: '2.3k',
    totalLikes: '503',
    introduction: '',
    field: ''
 }

  constructor(private userService: UserService,) {}

  // 获取存储在本地的用户信息
  getUserInfo() {
    return JSON.parse(localStorage.getItem('user-info'));
  }

  removeUserInfo() {
    localStorage.removeItem('user-info');
    return JSON.parse(localStorage.getItem('user-info'));
  }

  checkUser() {
    localStorage.setItem('user-info', JSON.stringify(this.user));
    return JSON.parse(localStorage.getItem('user-info'));
  }

  updateUser(user) {
    this.user = user;
    localStorage.setItem('user-info', JSON.stringify(this.user));
    return JSON.parse(localStorage.getItem('user-info'));
  }

    // users: User[];
    // // 获取存储在本地的用户信息
    // getUsersInfo() {
    //   this.userService
    //       .getUsers()
    //       .then(users => this.users = users);
    // }
    //
    // getUserInfo(user: User) {
    //   return this.userService
    //              .getUser(user.id);
    // }
    //
    //
    // // 删除存储在本地的用户信息，正常情况下返回 null
    // removeUserInfo(user: User) {
    //   this.userService
    //       .delete(user.id)
    //       .then(() => {
    //         this.users = this.users.filter(u => u !== user);
    //       });
    // }
    //
    // // 验证用户合法性，TODO: 实现用户合法性的安全验证
    // checkUser(id: string) {
    //   return this.userService.getUser(id);
    // }
    //
    // // 更新用户信息，TODO: 更新云端的用户信息，注意信息的合法性校验
    // updateUser(user: User) {
    //   return this.userService
    //              .update(user);
    //   }
    //
    // addUser(username: string, id: string, password: string) {
    //   this.userService
    //       .create(username, id, password)
    //       .then(user => {
    //       this.users.push(user);
    //     });
    // }


}
