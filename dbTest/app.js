const express = require('express');
const path = require('path');
const morgan = require('morgan');
const pug = require('pug');

const { sequelize } = require("./models");
// const indexRouter = require('./routes');
// const usersRouter = require('./routes/users');
// const commentsRouter = require('./routes/comments');

const app = express();

app.set('port', process.env.PORT || 3001);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

sequelize.sync({ force: true })
    .then(() => {
        console.log("데이터베이스 연결 성공");
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/comments', commentsRouter);

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