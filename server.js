const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;
const auth_routes = require('./routes/auth_routes');
const session = require('express-session');
const passport = require('./modules/passport');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/BUNNIES5LYFE');
mongoose.Promise = Promise;

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: '7dafhdv5fpR3C7ka3KTd2cOQBeTuzwFd',
  proxy: true,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

auth_routes(app);
// I dont think the register route does anything special at the moment
app.get('/registerpage', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/register.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on ${port}`));