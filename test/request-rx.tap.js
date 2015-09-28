'use strict';

var express = require('express');
var requestRx = require('../lib/request-rx');
var scotchTape = require('scotch-tape');

function setupServer(done) {
  var app = express();

  app.use('/test', function serveTest(req, res) {
    res.json({
      method: req.method,
      status: 'ok'
    });
  });

  return app.listen(8000, function onListen() {
    done();
  });
}

function teardownServer(server, done) {
  server.close(function closed() {
    done();
  });
}

var test = scotchTape({
  before: function beforeTest() {
    this._server = setupServer(this.end);
  },
  after: function afterTest() {
    teardownServer(this._server, this.end);
  }
});

test('request-rx', function run(it) {

  it('should successfully make http request', function should(t) {
    t.plan(4);

    requestRx({
      url: 'http://localhost:8000/test'
    }).subscribe(
      function onSuccess(result) {
        t.ok(result.response, 'should have http response');
        t.ok(result.body, 'should have http response body');
        var respBody = JSON.parse(result.body);
        t.deepEquals(respBody, {
          status: 'ok', method: 'GET'
        }, 'should have right http response');
      },
      function onError(result) {
        t.notOk(result.err, 'should not have http error');
      },
      function onCompleted() {
        t.ok(true, 'should call complete');
        t.end();
      }
    );
  });

  it('should handle http error', function should(t) {
    t.plan(1);

    requestRx({
      url: 'http://localhost:8000/xyz'
    }).subscribe(
      function onSuccess(result) {
        t.notOk(result, 'should not have http response');
      },
      function onError(result) {
        t.ok(result.err, 'should have http error');
        t.end();
      },
      function onCompleted() {
        t.ok(false, 'should not call completed');
        t.end();
      });
  });

  it('should honor defaults', function should(t) {

    t.plan(4);

    requestRx({
      method: 'POST',
      url: 'http://localhost:8000/test'
    }).subscribe(
      function onSuccess(result) {
        t.ok(result.response, 'should have http response');
        t.ok(result.body, 'should have http response body');
        var resp = JSON.parse(result.body);
        t.deepEquals(resp, {
          'status': 'ok', method: 'POST'
        }, 'should have the right default method');
      },
      function onError(result) {
        t.notOk(result.err, 'should not throw error');
      },
      function onCompleted() {
        t.ok(true, 'should not call completed');
        t.end();
      });
  });

});
