const express = require('express');
const cors = require('cors');
const session = require('express-session');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// TODO: temporary for testing?
app.use(express.json());

//user login
app.post('/login', routes.login);
// user logout
app.post('/logout', routes.logout);

//user register
app.post('/clients', routes.createClient);
// user delete
app.delete('/clients', routes.deleteClient);

app.get('/ViewFollow', routes.ViewFollow);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});



module.exports = app;