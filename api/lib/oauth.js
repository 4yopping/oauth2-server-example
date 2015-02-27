var oauthServer = require('oauth2-server'),
    model = require('../models/model');

var oauth = oauthServer({
  model: model,
  grants: ['password'],
  debug: true
});

module.exports = oauth;
