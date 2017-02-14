import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

import { User } from '../../services/user/user';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})

export class ProfileComponent{
  user: User;

  constructor(private router: Router, private authService: AuthService,
              public snackBar: MdSnackBar) {
    // 如果未登录，则跳转至 /welcome 页面
    this.user = this.authService.getUserInfo();
    if (this.user == null)
      this.router.navigate(['/welcome']);
  }

  updateUserInfo(formData) {
    console.log(formData);
    this.user.email = formData.email;
    this.user.introduction = formData.introduction;
    this.user.field = formData.field;
    // 提交修改
    this.user = this.authService.updateUser(this.user);
    this.snackBar.open('修改成功', '知道了', {
      duration: 2000,
    });
  }
}
