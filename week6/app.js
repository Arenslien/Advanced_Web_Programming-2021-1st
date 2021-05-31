const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");


// 기본 변수 설정
app.set("port", 3000);

app.listen(app.get("port"), () => {
    console.log(`Starting Server at http://localhost:${app.get("port")}`);
});

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, "assets")));

app.use((req, res, next) => {
    console.log("모든 요청에 대해 실행하는 미들웨어");
    req.user = "Arenslien";
    next();
});

app.use((req, res, next) => {
    res.day = "Sunghoon Jung";
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.get('/details/reqandres', (req, res) => {
    res.send(`${req.user} and ${res.day}`);
});

app.get('/about', (req, res, next) => {
    if(req.headers.cookie) next();
    else throw new Error("INVALID COOKIE");
});

app.use((err, req, res, next) => {
    res.status(401).send(err.message);
});