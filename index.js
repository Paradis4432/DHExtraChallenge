var express = require('express');
var router = express.Router();
var path = require('path');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.listen(3000);

var controller = require('./controller');
app.use('/', controller.change);