'use strict';

var Logger = require('./Logger');

module.exports = function(Config, basePath) {
  return new Logger(Config, basePath);
};
