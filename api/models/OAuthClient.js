var vogels = require('../lib/vogels'),
    joi    = require('joi');

var OAuthClient = vogels.define('OAuthClient', {
  hashKey: 'clientId',
  schema: {
    clientId: joi.string(),
    clientSecret: joi.string(),
    redirectUri: joi.string()
  }
});

module.exports = OAuthClient;
