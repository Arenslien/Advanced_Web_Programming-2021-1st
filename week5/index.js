const http = require("http");

http.createServer((req, res) => {
    console.log(req.url);
    res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
}).listen(3000, () => {
    console.log("서버 3000포터에서 구동중...")
});