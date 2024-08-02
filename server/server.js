const express = require('express');
const cors = require('cors');
const session = require('express-session');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use(express.json());

//login
app.post('/login', routes.login);
// logout
app.post('/logout', routes.logout);

//register
app.post('/clients', routes.createClient);
// delete
app.delete('/clients', routes.deleteClient);

app.get("/ViewFollow", routes.ViewFollow)
app.get("/HistoricalPrices", routes.HistoricalPrices)

app.get("/introduce", routes.introduce)
app.get("/ShareDetails", routes.ShareDetails)
app.get("/ShareDetailsText", routes.ShareDetailsText)
app.get("/recommendation", routes.recommendation)
app.get("/searchrecommendation", routes.searchrecommendation)


app.get("/button", routes.button)
app.get("/buttonRecommendation", routes.buttonRecommendation)


app.get("/JudgingAttention", routes.JudgingAttention)
app.get("/AddFollow", routes.AddFollow)
app.get("/DELEFollow", routes.DELEFollow)


app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});



module.exports = app;