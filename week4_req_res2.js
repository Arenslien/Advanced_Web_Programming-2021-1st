const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
    try {
        const html1 = await fs.readFile('./week4_response1.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html1);
    } catch(e) {
        console.error(e);
        res.writeHead(500, { 'Content-type': ' text/plain; charset=utf-8' });
        res.end(e.message);
    }
});

server.listen(3000);


server.on('listening', () => {
    console.log('listen 이벤트 리스너');
});

const server2 = http.createServer(async (req, res) => {
    try {
        const html1 = await fs.readFile('./week4_response2.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html1);
    } catch(e) {
        console.error(e);
        res.writeHead(500, { 'Content-type': ' text/plain; charset=utf-8' });
        res.end(e.message);
    }
});

server2.listen(3001);


server2.on('listening', () => {
    console.log('listen 이벤트 리스너');
});