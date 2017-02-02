const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// TODO: 增加 GET 和 POST 的 router.get '*'

module.exports = router;
