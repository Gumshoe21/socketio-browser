"use strict";
const path = require('path');
const express = require('express');
const app = express();
const { Server } = require('socket.io');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', 'dist/public/html');
app.get('/', (_req, res) => {
    res.render('index.ejs');
});
const server = app.listen(9000);
const io = new Server(server);
io.on('connection', (socket) => {
    console.log(socket.server.engine.clientsCount);
    socket.emit('joinGame', socket.server.engine.clientsCount);
});
