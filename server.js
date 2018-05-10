const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;
const auth_routes = require('./routes/auth_routes');
const session = require('express-session');
const passport = require('./modules/passport');
const mongoose = require('mongoose');
const Receipt = require('./models/Receipt')

mongoose.connect('mongodb://localhost/BUNNIES5LYFE');
mongoose.Promise = Promise;
mongoose.set('debug', true);
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

// app.get('/checkreceipts', function(req, res) {
//   // Find all notes in the notes collection
//   Receipt.findOneAndUpdate({ owner: '5ae266dd2fd6e33548ea3b34'},{total: '13.0'}), function(error, receipts) {
//     // Log any errors
//     if (error) {
//       console.log(error);
//     }
//     else {
//       // Otherwise, send json of the notes back to user
//       // This will fire off the success function of the ajax request
//       res.json(receipts);
//       console.log
//       console.log("it found something")
//       console.log(receipts)
//     }
//     console.log("this ran")
//   }
// })
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.listen(port, () => console.log(`Listening on ${port}`));