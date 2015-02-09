var express        = require('express');
var app            = module.exports.app = exports.app = express();
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var http           = require('http');
var fs             = require('fs');
var bodyParser     = require('body-parser');
var path           = require('path');

/*  CONFIGURATION  */
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('port', (process.env.PORT || 5000));

/* ROUTES */
app.use(express.static(__dirname + './views'));

/* LISTEN */
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
