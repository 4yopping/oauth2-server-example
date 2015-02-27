var restify = require('restify'),
    oauth = require('./lib/oauth'),
    server = restify.createServer({
      name: 'OAuth Server',
      version: '1.0.0'
    });

// Middlewares
server.use(restify.bodyParser());
server.use(restify.urlEncodedBodyParser({ mapParams : false }));
server.pre(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', '*');

  return next();
});

// Route [./]
server.get('/', function (req, res) {
  res.send(200, {
    name: server.name,
    version: server.versions
  });
});

// Route [./oauth/token]
server.post('/oauth/token', oauth.grant());

// Listen
if (!module.parent) {
  server.listen(process.env.PORT || 3000, function () {
    console.log('%s listening at %s', server.name, server.url);
  });
}

server.use(oauth.errorHandler());

module.exports = server;
