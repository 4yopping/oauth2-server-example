'use strict';

var request = require('supertest'),
    server  = require('../api/server'),
    user    = request.agent(server);

describe('OAuth2 Server', function () {

  describe('Server', function () {

    it('server should be found', function (done) {
      user.get('/')
        .expect(200, done);
    });

  });

  describe('User', function () {

    before(function () {
      this.credentials = {
        gran_type: 'password',
        username: 'admin',
        password: 'zenator'
      }
    });

    it('user should be able to access', function (done) {
      user.post('/oauth/token')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(this.credentials)
        .expect(201, done);
    });

  });

});
