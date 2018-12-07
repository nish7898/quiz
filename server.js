var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var uri = require('./config/database');



//mongoose.connect(configDB.url);
mongoose.Promise = global.Promise;
mongoose.connect(uri.url, {
    useMongoClient: true
});




require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(session({
    secret : 'ilovescotchscotchyscotchscotch',
    resave: true,
    saveUninitialized: true
}));
//app.use(session({ secret : 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);
