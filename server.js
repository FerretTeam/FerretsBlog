// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const compression = require('compression');
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
  const port = process.env.PORT || '3000';
  app.set('port', port);

  // Create HTTP server.
  const server = http.createServer(app);

  // Listen on provided port, on all network interfaces.
  server.listen(port, () => console.log(`Ferrets Blog is running on localhost:${port}`));
});
