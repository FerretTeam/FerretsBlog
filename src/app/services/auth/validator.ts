export class Validator {
  constructor() {}

  // 登录的校验器
  signInValidator(formData) {
    let username = formData.username;
    let password = formData.password;
    let errorMessage: string = '';

    let usernameRegex = /^[a-zA-Z0-9]+$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]+$/;

    // 对用户名进行校验
    if (username == null || username == undefined || username == '')
      errorMessage = '用户名不能为空';
    else if (username.length < 5 || username.length > 10)
      errorMessage = '用户名长度需在 5 到 10 之间';
    else if (username.match(usernameRegex) == null)
      errorMessage = '用户名只能由字母和数字组成';

    // 对密码进行校验
    else if (password == null || password == undefined || password == '')
      errorMessage = '密码不能为空';
    else if (password.length < 8 || password.length > 20)
      errorMessage = '密码长度需在 8 到 20 之间';
    else if (password.match(passwordRegex) == null)
      errorMessage = '密码至少需包含一个大写字母、一个小写字母、一个数字和一个特殊字符';

    else
      errorMessage = '';

    return errorMessage;
  }

  // 注册的校验器
  signUpValidator(formData) {
    let username = formData.username_;
    let email = formData.email_;
    let password = formData.password_;
    let errorMessage: string = '';

    let usernameRegex = /^[a-zA-Z0-9]+$/;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]+$/;

    // 对用户名进行校验
    if (username == null || username == undefined || username == '')
      errorMessage = '用户名不能为空';
    else if (username.length < 5 || username.length > 10)
      errorMessage = '用户名长度需在 5 到 10 之间';
    else if (username.match(usernameRegex) == null)
      errorMessage = '用户名只能由字母和数字组成';

    // 对邮箱进行校验
    else if (email == null || email == undefined || email == '')
      errorMessage = '邮箱不能为空';
    else if (email.match(emailRegex) == null)
      errorMessage = '邮箱不符合格式规范';

    // 对密码进行校验
    else if (password == null || password == undefined || password == '')
      errorMessage = '密码不能为空';
    else if (password.length < 8 || password.length > 20)
      errorMessage = '密码长度需在 8 到 20 之间';
    else if (password.match(passwordRegex) == null)
      errorMessage = '密码至少需包含一个大写字母、一个小写字母、一个数字和一个特殊字符';

    else
      errorMessage = '';

    return errorMessage;
  }

}
