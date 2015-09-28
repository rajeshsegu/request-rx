'use strict';

var Rx = require('rx');
var requireFetch = require('./require-fetch');

var request = (function newRequest() {
  return requireFetch('request');
}());

var originalInit = request.Request.prototype.init;

request.Request.prototype.init = function supportRx(options) {
  var self = this;
  var args = Array.prototype.slice.call(arguments);

  if (self._rxInstance) {
    return originalInit.apply(self, args);
  }

  if (!self._rxInstance) {

    self._rxInstance = Rx.Observable.create(function createObservable(o) {

      function rxCallback(err, resp, body) {

        if (err) {
          return o.onError({
            err: err,
            response: resp
          });
        }

        if (!/^2/.test('' + resp.statusCode)) {
          return o.onError({
            err: body,
            response: resp
          });
        }

        o.onNext({
          body: body,
          response: resp
        });
        o.onCompleted();
      }

      self.callback = rxCallback;

      return originalInit.apply(self, args);
    });
  }
};

function expose(method) {
  if (request.Request.prototype[method]) {
    throw Error('Cannot overwrite Request method "' + method);
  }
  request.Request.prototype[method] = function exposeMethod() {
    return this._rxInstance[method].apply(this._rxInstance, arguments);
  };
}

expose('subscribe');
expose('subscribeOnNext');
expose('subscribeOnError');
expose('subscribeOnCompleted');

module.exports = request;
