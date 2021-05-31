const http = require('http');
const fs = require('fs').promises;
const port = 3000;

const developer = [
    { tech:'nodejs', name:'Ryan Dahl' },
    { tech:'www', name:'Tim Berners-Lee' },
    { tech:'tcpip', name:'Vinton Cerf'}
];

let find = {};

http.createServer(async (req, res) => {
    try {
        // GET 요청
        console.log("--------------");
        console.log("req.method:", req.method);
        console.log("req.url:", req.url);
        if (req.method === 'GET') {
            if (req.url === '/') {
                console.log('GET /');
                const data = await fs.readFile('./week4_get_post1.html');
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                return res.end(data);
            } else if (req.url === '/nodejs') {
                console.log('GET /nodejs');
                const data = await fs.readFile('./week4_nodejs.html');
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                return res.end(data);
            } else if (req.url === 'answer') {
                let answer = 'no answer';
                developer.forEach( (dev) => {
                    if (dev.tech === find.tech) {
                        answer = dev.name;
                    }
                });
                return res.end( answer );
            }

            
            try {
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
            } catch(error) {
                console.error(error);
                res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});
                return res.end('NOT FOUND');
            }

        } else if (req.method === 'POST') {
            if (req.url === '/input1') {
                console.log("Post /input1");
                req.on('data', (data) => {
                    console.log("POST /input1 data:", data.toString());
                    find = JSON.parse(data);
                    res.writeHead(201, {'Content-Type':'text/plain; charset=utf-8'});
                    return res.end('ok');
                });
            }
        }
    } catch(error) {

    }
}).listen(port);


