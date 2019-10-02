const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://brunofow:rayepenber@omnistack9-gt4za.mongodb.net/semana09?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para PUT e DELETE)
// req.body = Acessar o corpo da requisição

app.use(express.json());
app.use(routes);

app.post('/users', (req, resp) => {
  return resp.json(req.body)
})


app.listen(3333);
