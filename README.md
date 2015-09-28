[![Build Status](https://travis-ci.org/rajeshsegu/request-rx.svg?branch=master)](https://travis-ci.org/rajeshsegu/request-rx)
[![Coverage Status](https://coveralls.io/repos/rajeshsegu/request-rx/badge.svg?branch=master&service=github)](https://coveralls.io/github/rajeshsegu/request-rx?branch=master)
# request-rx

request module that returns rx.Observable

## Installation
```
npm install request-rx
```

## Usage

### subscribe()

```
var requestRx = require('request-rx');

var weatherApi = 'http://api.openweathermap.org/data/2.5/weather?q=San%20Francisco,%20CA';

requestRx({
  url: weatherApi
}).subscribe(
	function onNext(result) {
		// result.response
		// result.body
	    console.log('>> subscribe() > next');
	    log(result.body);
	  },
	  function onError(result) {
		// result.err
		// result.response
		log('>> subscribe() > error');
	    log(result.err);
	  },
	  function onDone() {
	    log('>> subscribe() > done');
	  }
  );
```

### subscribeOnNext()

```
requestRx({
  url: weatherApi
}).subscribeOnNext(function onNext(result) {
	console.log('>> subscribeOnNext()');
	log(result.body);
});
```

### subscribeOnDone()

```
requestRx({
  url: weatherApi
}).subscribeOnDone(function onDone() {
	console.log('>> subscribeOnDone()');
});
```

### subscribeOnError()

```
requestRx({
  url: weatherApi
}).subscribeOnError(function onError(result) {
	console.log('>> subscribeOnError()');
	log(result.err);
});
```

## Examples

You can the working example under `examples` folder

```
npm run examples
```
