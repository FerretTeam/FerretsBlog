var express = require('express');
var router = express.Router();

router = require('./auth')(router);
router = require('./user')(router);

module.exports = router;
