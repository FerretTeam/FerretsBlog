var express = require('express');
var router = express.Router();

router = require('./auth')(router);

module.exports = router;
