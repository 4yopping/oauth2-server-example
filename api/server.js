var express = require('express'),
    oauth = require('./lib/oauth'),
    server = express();

// Middlewares
var bodyParser = require('body-parser'),
    logger = require('morgan');

// Conf
server.set('port', process.env.PORT || 3000);

// Middlewares
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(logger('dev'));

// Route [GET /]
server.get('/', function (req, res, next) {
  res.status(200).send({
    name: server.name,
    version: server.versions
  });
});

// Route [POST /oauth/token]
server.post('/oauth/token', oauth.grant());

// Route [GET /gold]
server.get('/gold', oauth.authorise(), function (req, res) {
  res.status(200).send({});
});

// Listen
if (!module.parent) {
  server.listen(server.get('port'), function () {
    console.log('Server listening at %s', server.get('port'));
  });
}

module.exports = server;
