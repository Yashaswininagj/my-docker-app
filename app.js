const http = require('http');

http.createServer((req, res) => {
  res.end("Hello from Docker Project!");
}).listen(3000);

console.log("Server running on port 3000");