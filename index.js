const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const { spawn } = require('child_process');

const PORT = 8080;

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      const htmlPath = path.join(__dirname, 'html', '../html/index.html');
      fs.readFile(htmlPath, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    } else if (req.url === '../js/script.js') {
      const jsPath = path.join(__dirname, 'js', 'script.js');
      fs.readFile(jsPath, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      });
    } else if (req.url === '../html/ofuscador.py') {
      const pyPath = path.join(__dirname, 'py', 'ofuscador.py');
      fs.readFile(pyPath, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
        res.end(data);
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } else if (req.method === 'POST') {
    if (req.url === '/ofuscar') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const data = qs.parse(body);
        const code = data.code;
        const pyPath = path.join(__dirname, 'py', 'ofuscador.py');
        const process = spawn('python', [pyPath, code]);
        process.stdout.on('data', data => {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(data);
        });
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
