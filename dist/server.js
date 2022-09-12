"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socketio = require("socket.io");
const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', 'dist/public/html');
app.get('/', (_req, res) => {
    res.render('index.ejs');
});
const server = app.listen(9000);
const io = new socketio.Server(server);
io.on('connection', (socket) => {
    const clientsCount = io.of('/').sockets.size;
    console.log(clientsCount);
    socket.emit('joinGame', clientsCount);
});
