const path = require('path');
const express = require('express');
const app = express();
const { Server } = require('socket.io');

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  joinGame: (clientsCount: number) => void;
}

interface ClientToServerEvents {
  hello: (a: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

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
