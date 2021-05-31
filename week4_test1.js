const http = require("http");
const fs = require("fs").promises;

const port = 3000;

const developer = [
    { tech:'nodejs', name:'Ryan Dahl' },
    { tech:'www', name:'Tim Berners-Lee' },
    { tech:'tcpip', name:'Vinton Cerf'}
];

let postedData = {};

http.createServer(async (req, res) => {
    if (req.method === "GET") {
        // 기본 화면 요청이 올 때
        if (req.url == "/") {
            console.log("GET: /");
            // 기본 html 화면 파일 받기
            const html = await fs.readFile("./week4_get_post1.html");

            // html & header 작성
            res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8" });
            return res.end(html);
        } else if (req.url == "/nodejs") {
            console.log("GET: /nodejs");

            const html = await fs.readFile("./week4_nodejs.html");

            // html & header 작성
            res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8" });
            return res.end(html);
        } else if (req.url == "/answer") {
            console.log("GET: /answer");

            let answer = "no answer";
            developer.forEach((object) => {
                if(object.tech == postedData.text) {
                    answer = object.name;
                }
            });
            
            return res.end(answer);
        }

        try {
            const data = await fs.readFile(`.${req.url}`);
            res.end(data);
        } catch(error) {
            console.error(error);
        }

    } else if (req.method === "POST") {
        if(req.url == "/submit") {
            console.log("POST: /submit");
            req.on('data', (chunk) => {
                postedData = JSON.parse(chunk);
                res.writeHead(201, {'Content-Type':'text/plain; charset=utf-8'});
                return res.end('ok');
            });
        }
    }
    
}).listen(port);