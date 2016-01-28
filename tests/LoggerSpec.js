'use strict';

require('should');
var sinon = require('sinon');
var Logger = require('../Logger');

describe('<Unit Test>', function () {
  describe('Logger Spec', function () {

    it('is initializible', function () {
      var api = require('log4js');
      var mock = sinon.mock(api);

      // mock.expects('hello').once();
      // api.hello();

      mock.expects('configure').once();
      // mock.expects('loadAppender').twice();
      // mock.expects('getLogger').once().returns(api);
      // mock.expects('hasLogger').once();

      var logger = new Logger(__dirname, api);

      mock.verify();
    });

    

  });
});
