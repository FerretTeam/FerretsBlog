const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/sign-in', (req, res) => {
  let user = {
    username: 'Ren',
    userAvatarUrl: './assets/images/user-avatar.jpg'
  };
  res.json(user);
});

router.get('/baidu_verify_AZ3hdfhAjH.html', (req, res) => {
  res.sendFile(path.join(__dirname + '../index.html')); 
});

// TODO: 增加 GET 和 POST 的 router.get '*'

module.exports = router;
