export class Validator {
  constructor() {}

  checkUserInfo = function(image, email) {
    var errorMessage = '';

    // 定义校验规则
    let imageRegex = /^(?:data:image\/([a-zA-Z]*);base64,)?(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
    let emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // 对图片进行校验
    if (image == null || image == undefined || image == '')  // 防止为空的恶意攻击
      errorMessage = '图片不符合格式规范';
    else if (String(image).match(imageRegex) == null && String(image) != '/assets/images/default-avatar.jpg')
      errorMessage = '图片不符合格式规范';

    // 对邮箱进行校验
    else if (email == null || email == undefined || email == '')  // 防止为空的恶意攻击
      errorMessage = '邮箱不符合格式规范';
    else if (String(email).match(emailRegex) == null)
      errorMessage = '邮箱不符合格式规范';

    return errorMessage;
  }
}
