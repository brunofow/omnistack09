const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {}; 

mongoose.connect('mongodb+srv://brunofow:rayepenber@omnistack9-gt4za.mongodb.net/semana09?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

io.on('connection', socket => {

   const { user_id  } = socket.handshake.query;
   
   connectedUsers[user_id] = socket.id;
});

app.use((req, resp, next) => {
  req.io = io;

  req.connectedUsers = connectedUsers;

  return next();
});

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para PUT e DELETE)
// req.body = Acessar o corpo da requisição

app.use(cors())
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes);

app.post('/users', (req, resp) => {
  return resp.json(req.body)
})


server.listen(3333);
