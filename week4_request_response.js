const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');

    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.write('<h1>Hello, Node!</h1>');
    res.end('<p>Hello, World!</p>');

    console.log('서버에게 요청합니다.');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

server.on('connection', () => {
    console.log('서버를 연결합니다.');
});

server.on('close', () => {
    server.close();
});
