const http = require('http');
const app = require('./app'); // varsinainen Express-sovellus

/**
 * creates a server and runs the application in app.js
 */
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
