'use strict';

require('should');
let sinon = require('sinon');
let Logger = require('../Logger');

describe('<Unit Test>', () => {
  describe('Logger Spec', () => {

    it('is initializible', () => {
      let api = require('log4js');
      let mock = sinon.mock(api);

      mock.expects('configure').once();

      let logger = new Logger(__dirname, api);

      mock.verify();
    });

  });
});
