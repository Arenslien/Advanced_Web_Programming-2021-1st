const express = require('express');
const SocketIO = require('socket.io');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


const server = app.listen(3000, () => {
    console.log(3000, '번 포트에서 대기 중');
});

const io = SocketIO(server);

// 웹 소켓 연결시

io.on('connection', (socket) => {
    console.log('새로운 클라이언트 접속!', socket.id);
    
    io.to(socket.id).emit('welcome', '(From Server) welcome!' + socket.id);

    socket.on('disconnect', () => {
        console.log('클라이언트 접속 해제', socket.id);
    });

    socket.on('echopush', (msg) => {
        // socket.broadcast.emit('echo', msg);
        // io.emit('echo', msg);
        socket.emit('echo', msg);
    });
});