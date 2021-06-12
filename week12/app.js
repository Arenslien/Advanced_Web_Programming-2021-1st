const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const path = require('path');
const passport = require('passport');

// dotenv config
dotenv.config();


// Import pageRouter
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

// passport 설정 모듈
const passportConfig = require('./passport');
passportConfig();

const app = express();
app.set('port', process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure('views', {
    express: app,
    watch: true,
});


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);

// sequelize
const { sequelize } = require("./models");

sequelize.sync({ force: false })
.then(() => {
    console.log("데이터베이스 연결 성공");
})
.catch((err) => {
        console.error(err);
});

app.use('/', pageRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log("SERVER START");
});