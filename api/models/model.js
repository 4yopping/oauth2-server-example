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


// Get Access Token
module.exports.getAccessToken = function (bearerToken, callback) {
  OAuthAccessToken.get({ accessToken: bearerToken }, function (err, data) {
    if (err || !data) {
      return callback(err, data);
    }

    data.attrs.expires = new Date(data.expires * 1000);

    callback(err, data);
  });
};

// Get Client
module.exports.getClient = function (clientId, clientSecret, callback) {
  OAuthClient.get({ clientId: clientId }, function (err, data) {
    if (err || !data) {
      return callback(err, data);
    }

    if (data.attrs.clientSecret !== clientSecret) {
      return callback();
    }

    callback(null, data);
  });
};

// Grant Type Allowed
var authorizedClientIds = ['1234567890'];
module.exports.grantTypeAllowed = function (clientId, grantType, callback) {
  if (grantType === 'password') {
    return callback(false, authorizedClientIds.indexOf(clientId) >= 0);
  }

  callback(false, true);
};

// Save Access Token
module.exports.saveAccessToken = function (accessToken, clientId, expires, user, callback) {
  var token = {
    accessToken: accessToken,
    clientId: clientId,
    userId: user.id
  };

  if (expires) {
    token.expires = parseInt(expires / 1000, 10);
  }

  OAuthAccessToken.create(token, callback);
};

// Get User
module.exports.getUser = function (username, password, callback) {
  OAuthUser.get({ email: username }, function (err, data) {
    if (err) {
      return callback(err);
    }

    callback(null, { id: "email:" + data.attrs.email });
  });
};
