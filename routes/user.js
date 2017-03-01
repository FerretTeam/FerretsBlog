const mongoose = require('mongoose');

module.exports = function(router) {
  // 定义模式
  const userSchema = new mongoose.Schema({
    id: Number,
    // 基本信息
    username: String,
    email: String,
    userAvatarUrl: String,
    // 成就
    totalCharacters: String,  // 为了排版便利，在 service 中将大数转换为 k 或 m
    totalReading: String,
    totalLikes: String,
    // 详细信息
    introduction: String,
    field: String
  });

  // 定义模型
  const User = mongoose.model('User', userSchema);

  // 新建用户
  router.post('/create-user', (req, res) => {
    // 创建新的用户
    // TODO 校验证书，并新建用户实例
    console.log(req.body);
    res.json('good');
  });

  return router;
}
