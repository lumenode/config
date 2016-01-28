'use strict';

var Logger = require('./Logger');

module.exports = function(basePath) {
  return new Logger(basePath);
};
