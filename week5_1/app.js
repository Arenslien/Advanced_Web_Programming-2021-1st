const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

app.set('port', process.env.PORT || 3000);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./index.html'));
    // res.send('Hello Express!');
});

app.get('/about', (req, res) => {
    res.send('/about page');
});

app.get('/users/:userId', (req, res) => {
    // res.send(req.params);
    res.status(200).send(`User ${req.params.userId}`);
});

app.get('/users/:userId/book/:bookId', (req, res) => {
    // res.send(req.params);
    res.send(`User ${req.params.userId} | book ${req.params.bookId}`);
});

app.get('*', (req, res) => {
    res.status(404).send("<h1>NOT FOUND!</h1>");
});



app.listen(app.get('port'), () => {
    console.log(`App listening at http://localhost:${app.get('port')}`);
});