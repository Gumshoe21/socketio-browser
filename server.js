'use strict';
const path = require('path');
const express = require('express');
const app = express();
const socketio = require('socket.io');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', 'dist/public/html');
app.get('/', (_req, res) => {
  res.render('index.ejs');
});
const server = app.listen(9000);
const io = socketio(server);
io.on('connection', (socket) => {
  console.log('Socket server connected.');
});
