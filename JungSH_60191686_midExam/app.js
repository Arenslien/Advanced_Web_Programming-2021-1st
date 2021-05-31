// 필요한 모듈 import
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs").promises;
const pug = require("pug");

// Importing Router
const loginRouter = require("./public/routes/login.js");
const settingRouter = require("./public/routes/setting.js");
const signUpRouter = require("./public/routes/sign-up.js");
const projectRouter = require("./public/routes/project.js");

dotenv.config();
const app = express();

// 설정
app.set("port", process.env.PORT || 3000);
// app.set("", path.join(__dirname, "/public/pages")); 나중에 리팩토링
app.set("views", path.join(__dirname, "./public/pages"));
app.set("view engine", "pug");


// 미들웨어
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, "./public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.SECRET_KEY));

// Router
app.use("/login", loginRouter);
app.use("/setting", settingRouter);
app.use("/sign-up", signUpRouter);
app.use("/project", projectRouter);
app.get('/', async (req, res) => {
    update = JSON.parse(await fs.readFile("./public/update/update_content.json"));
    res.render("index", {update: update});
});

app.get('/github', (req, res) => {
    res.redirect("https://github.com/arenslien");
});

app.use((req, res, next) => {
    // console.error(err);
    res.status(404).render("error");
    res.render("error");
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 서버를 시작합니다.");
});
