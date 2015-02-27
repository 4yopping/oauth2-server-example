var vogels = require('../lib/vogels'),
    joi    = require('joi');

var OAuthRefreshToken = vogels.define('OAuthRefreshToken', {
  hashKey: 'clientId',
  schema: {
    refreshToken: joi.string(),
    clientId: joi.string(),
    userId: joi.string(),
    expires: joi.date()
  }
});

module.exports = OAuthRefreshToken;
