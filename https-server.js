// Get dependencies
const express = require('express');
const path = require('path');
const https = require('https');
const http = require('http');
const bodyParser = require('body-parser');
const compression = require('compression');
const fs = require('fs');
const mongoose = require('mongoose');

// 设置数据库
const databaseUrl = 'mongodb://lrrLoveSqq:8S1h6U6R3eN@localhost:5050/admin';
mongoose.connect(databaseUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // Get our API routes
  const api = require('./routes/api');

  const app = express();

  // Parsers for POST data
  app.use(bodyParser.json({ limit: '4mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));

  // 压缩文件
  app.use(compression());

  // Point static path to dist
  app.use(express.static(path.join(__dirname, 'dist')));

  // Set our api routes
  app.use('/api', api);

  // Catch all other routes and return the index file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

  // Get port from environment and store in Express.
  const port = process.env.PORT || '443';
  app.set('port', port);

  var privateKey = fs.readFileSync('./ssl/2_ferrets.me.key');
  var certificate = fs.readFileSync('./ssl/1_ferrets.me_bundle.crt');

  // Create HTTPS server.
  const server = https.createServer({
    key: privateKey,
    cert: certificate
  }, app);

  // Listen on provided port, on all network interfaces.
  server.listen(port, () => console.log(`Ferrets Blog is running on localhost:${port}`));

  // 增加从 http 到 https 的重定向
  http.createServer(function (req, res) {
    res.writeHead(301, { 'Location': 'https://' + req.headers['host'] + req.url });
    res.end();
  }).listen(80);
});
