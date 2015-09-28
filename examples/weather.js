'use strict';

var requestRx = require('../');
var log = console.log; //eslint-disable-line

// >> subscribe()

requestRx({
  url: 'http://api.openweathermap.org/data/2.5/weather?q=San%20Francisco,%20CA'
}).subscribe(function onNext(result) {
    log('>> subscribe() > next');
    log(result.body);
  },
  function onError(result) {
    log('>> subscribe() > error');
    log(result.err);
  },
  function onFinish() {
    log('>> subscribe() > done\n');
  });

// >> subscribeOnNext()

requestRx({
  url: 'http://api.openweathermap.org/data/2.5/weather?q=San%20Francisco,%20CA'
}).subscribeOnNext(function onNext(result) {
  log('>> subscribeOnNext()');
  log(result.body);
});

// >> subscribeOnCompleted()

requestRx({
  url: 'http://api.openweathermap.org/data/2.5/weather?q=San%20Francisco,%20CA'
}).subscribeOnCompleted(function onFinish() {
  log('>> subscribeOnCompleted()');
  log('Done!\n');
});

// >> subscribeOnError()

requestRx({
  url: 'http://api.openweathermap.org/data/2.5/wather?q=San%20Francisco,%20CA'
}).subscribeOnError(function onError(result) {
  log('>> subscribeOnError()');
  log(result.err);
});
