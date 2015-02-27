var vogels = require('../lib/vogels');

var OAuthAccessToken = require('./OAuthAccessToken'),
    OAuthRefreshToken = require('./OAuthRefreshToken'),
    OAuthClient = require('./OAuthClient'),
    OAuthUser = require('./OAuthUser');

// Create tables if not exist
vogels.createTables({
  OAuthAccessToken: { readCapacity: 1, writeCapacity: 1 },
  OAuthRefreshToken: { readCapacity: 1, writeCapacity: 1 },
  OAuthClient: { readCapacity: 1, writeCapacity: 1 },
  OAuthUser: { readCapacity: 1, writeCapacity: 1 }
}, function (err) {
  if (err) {
    console.log('Error creating tables', err);
  }
});


module.exports.getAccessToken = function (bearerToken, callback) {};

module.exports.getClient = function (clientId, clientSecret, callback) {};

module.exports.grantTypeAllowed = function (clientId, grantType, callback) {};

module.exports.saveAccessToken = function (token, clientId, expires, userId, callback) {};

module.exports.getUser = function (username, password, callback) {};

module.exports.saveRefreshToken = function (token, clientId, expires, userId, callback) {};

module.exports.getRefreshToken = function (refreshToken, callback) {};
