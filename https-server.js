// Get dependencies
const express = require('express');
const path = require('path');
const https = require('https');
const bodyParser = require('body-parser');
const fs = require('fs');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '443';
app.set('port', port);

var privateKey = fs.readFileSync('./ssl/2_ferrets.me.key');
var certificate = fs.readFileSync('./ssl/1_ferrets.me_bundle.crt');

/**
 * Create HTTPS server.
 */
const server = https.createServer({
  key: privateKey,
  cert: certificate
}, app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));