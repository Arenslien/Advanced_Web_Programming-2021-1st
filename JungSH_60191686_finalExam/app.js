// Import Packages
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

// Import Router
const indexRouter = require('');

// Import Sequelize
const { sequelize } = require('./models');

// Create Express Application
const app = express();

// Setting Express value
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

// Use Middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser(process.env.SECRET_KEY));

// Conneting Router
app.use('/', indexRouter);

// ERROR
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