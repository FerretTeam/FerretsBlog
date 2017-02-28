const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

// 定义模式
const passportSchema = new mongoose.Schema({
  username: String,
  encryptedPassword: String
});

// 定义模型
const Passport = mongoose.model('Passport', passportSchema);

// GET api listing
router.post('/sign-in', (req, res) => {
  console.log(req.body);
  res.json('123');
});

module.exports = router;
