import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { User } from '../../services/user/user';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})

export class ProfileComponent{
  user: User = null;
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService,
              public snackBar: MdSnackBar, private userService: UserService) {
    // 如果未登录，则跳转至 /welcome 页面
    if (this.authService.getPassport() == null)
      this.router.navigate(['/welcome']);
    else
      this.userService.getUserInfo().subscribe(data => this.user = data);
  }

  updateUserInfo(formData) {
    this.user.email = formData.email;
    this.user.introduction = formData.introduction;
    this.user.field = formData.field;
    // 提交修改
    this.userService.updateUser(this.user).subscribe(
      (data) => {
        if (data.username != undefined) {
          this.user = data;
          this.snackBar.open('修改成功', '知道了', { duration: 2000 });
          this.errorMessage = '';
        } else {
          this.errorMessage = data;
        }
      }
    );
  }

  avatarChange(event) {
    var reader = new FileReader();
    var that = this;

    reader.onload = function(e: any) {
      that.user.userAvatarUrl = e.target.result;
    };

    if (event.target.files[0] != undefined)
      reader.readAsDataURL(event.target.files[0]);
  }

}
