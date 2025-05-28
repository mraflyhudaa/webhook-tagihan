const http = require('http');
const logger = require('./utils/logger');

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200);
    res.end('OK');
    logger.debug('Health check passed');
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

module.exports = server;
