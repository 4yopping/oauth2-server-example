var vogels = require('../lib/vogels'),
    joi    = require('joi');

var OAuthUser = vogels.define('OAuthUser', {
  hashKey: 'email',
  schema: {
    email: joi.string(),
    password: joi.string(),
    firstname: joi.string(),
    lastname: joi.string()
  }
});

module.exports = OAuthUser;
