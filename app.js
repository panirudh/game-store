//Express
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/client'));

//Passport
var passport = require('passport');
require('./config/passport')(passport); // pass passport for configuration

//Cookie and session
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(session({
  secret: 'this is the secret'
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//Body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
}));

//Load .env file
var dotenv = require('dotenv');
dotenv.load();

// routes
require('./routes/auth.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./routes/genres.js')(app);
require('./routes/games.js')(app);
require('./routes/users.js')(app);

//listen port
app.listen(process.env.PORT || 3000);