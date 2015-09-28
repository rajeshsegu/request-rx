'use strict';

var extend = require('xtend/mutable');

function getRequrieCache() {
  return require.cache;
}

function setRequireCache(cache) {
  extend(require.cache, cache);
}

function clearCache() {
  var packageCache = getRequrieCache();

  Object.keys(packageCache)
    .forEach(function each(requirePackage) {
      delete packageCache[requirePackage];
    });
}

function forceFetch(packageName) {

  var backupRequireCache = extend({}, getRequrieCache());
  clearCache();

  var reloadedPackage = require(packageName);

  clearCache();
  setRequireCache(backupRequireCache);

  return reloadedPackage;
}

module.exports = forceFetch;
