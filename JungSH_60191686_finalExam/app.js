// Import Packages
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const passport = require('passport');
const dotenv = require('dotenv');
const path = require('path');

// Import Router
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const projectRouter = require('./routes/project');
const skillRouter = require('./routes/skill');

// Import Sequelize
const { sequelize } = require('./models');

// Create Express Application
const app = express();

// dotenv config
dotenv.config();

// Setting Express value
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'html');

nunjucks.configure('views', {
   express: app,
   watch: true, 
});

// Use Middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'front')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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

// Passport 
app.use(passport.initialize());
app.use(passport.session());

// // passport Config
const passportConfig = require('./passport');
passportConfig();

// Connect sequelize
sequelize.sync({ force: false })
.then(() => {
    console.log("데이터베이스 연결 성공");
})
.catch((err) => {
        console.error(err);
});

// Conneting Router
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/project', projectRouter);
app.use('/skill', skillRouter);


// ERROR Handling
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

// Start Server
app.listen(app.get('port'), () => {
    console.log(`Starting Server at http://localhost:${app.get('port')}`);
});