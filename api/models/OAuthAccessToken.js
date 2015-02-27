var vogels = require('../lib/vogels'),
    joi    = require('joi');

var OAuthAccessToken = vogels.define('OAuthAccessToken', {
  hashKey: 'clientId',
  schema: {
    accessToken: joi.string(),
    clientId: joi.string(),
    userId: joi.string(),
    expires: joi.date()
  }
});

module.exports = OAuthAccessToken;
