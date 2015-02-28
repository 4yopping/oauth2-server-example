'use strict';

var request = require('supertest'),
    server  = require('../api/server'),
    user    = request.agent(server),
    assert  = require('assert');

var models = {
  OAuthClient: require('../api/models/OAuthClient'),
  OAuthUser: require('../api/models/OAuthUser')
};

describe('OAuth2 Server', function () {

  describe('Server', function () {

    it('server should be found', function (done) {
      user.get('/')
        .expect(200, done);
    });

  });

  describe('User', function () {

    var token = {};

    before(function (done) {
      this.credentials = {
        grant_type: 'password',
        username: 'john@doe.com',
        password: 'zenator',
        client_id: '1234567890',
        client_secret: '0987654321'
      }

      models.OAuthClient.create({
        clientId: this.credentials.client_id,
        clientSecret: this.credentials.client_secret,
        redirectUri: '/redirect'
      }, function () {
        models.OAuthUser.create({
          email: 'john@doe.com',
          password: 'MjkAEs9$3%dSs',
          firstname: 'John',
          lastname: 'Doe'
        }, done);
      });

    });

    after(function (done) {
      models.OAuthClient.destroy(this.credentials.client_id, function () {
        models.OAuthUser.destroy('john@doe.com', done);
      });
    });

    it('user should be able to access', function (done) {
      user.post('/oauth/token')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(this.credentials)
        .expect(200, function (err, res) {
          if (err) {
            return done(err);
          }

          token.token_type = res.body.token_type;
          token.access_token = res.body.access_token;
          token.expires_in = res.body.expires_in;

          assert(token.token_type);
          assert(token.access_token);
          assert(token.expires_in);

          done();
        });
    });

    it('user should not be able to access with access_token invalid', function (done) {
      user.get('/gold?access_token=bdwhbrehbfhuerbfhberhfer')
        .expect(500, done);
    });

    it('user should be able to access with access_token', function (done) {
      user.get('/gold?access_token=' + token.access_token)
        .expect(200, done);
    });

  });

});
