import * as express from 'express';
import * as socketio from 'socket.io';

const app = express();

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

const io = new socketio.Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server);

io.on('connection', (socket) => {
  const clientsCount: number = io.of('/').sockets.size;
  console.log(clientsCount);
  socket.emit('joinGame', clientsCount);
});
