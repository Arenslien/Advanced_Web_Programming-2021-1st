const express = require('express');

const app = express();

const indexRouter = require('./routes/index.js');
const userRouter = require('./routes/user.js');

app.set('port', 3000);


app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.listen(app.get('port'), () => {
    console.log("START");
});
