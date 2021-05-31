const http = require('http');

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, { 'Set-Cookie': ['class=AdvWeb', 'credits=3']});
    res.write('Cookie Testing');
    res.end('......');
}).listen(3000, () => {
    console.log("3000번 포트에서 서버 대기중...");
});

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);

    if(req.headers.cookie) {
        const cookie = req.headers.cookie
                        .split(';')
                        .map((element) => {
                            element = element.split('=');
                            return {
                                name: element[0],
                                value: element[1],
                            };
                        });
        res.write('<h1>Cookie Value</h1>');
        res.end(`<h2>${JSON.stringify(cookie)}</h2>`);
    } else {
        res.writeHead(200, {
           'Content-Type': 'text/html; charset=utf-8',
           'Set-Cookie': ['class=AdvWeb', 'credits=3'], 
        });
        res.end('<h2>쿠키 생성함</h2>');
    }

    
}).listen(3001, () => {
    console.log("3001번 포트에서 서버 대기중...");
});