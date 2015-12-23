'use strict';

require('should');
var Config = require('../Repository');

describe('<Unit test>', function () {
  describe('Config Repository Spec', function () {

    var config;

    beforeEach(function () {
      config = new Config;
    });

    it('is empty', function () {
      config.all().should.be.empty;
    });

    it('sets value', function () {
      config.set('some-key', 'some-value');

      config.all().should.be.eql({
        'some-key': 'some-value'
      });
    });

    it('retrieves values', function () {
      config.set('some-new-key', 'value');

      config.get('some-new-key').should.be.eql('value');
    });

    it('sets deep value by path/query', function () {
      config.set('some.deep.key', {
        hello: 'world'
      });

      config.get('some').should.be.eql({
        deep: {
          key: {
            hello: 'world'
          }
        }
      });
    });

    it('retrieves deep values', function () {
      config.set('level1.level2.level3.level4', 'hi');

      config.get('level1.level2').should.be.eql({
        level3: {
          level4: 'hi'
        }
      });
    });

    it('loads big amount of data', function () {
      config.load({
        level1: 'hello',
        level2: {
          level21: 'hello2'
        }
      });

      config.get('level1').should.be.eql('hello');
      config.get('level2').should.be.eql({
        level21: 'hello2'
      });
      config.get('level2.level21').should.be.eql('hello2');

      config.load({
        level1: 'hello2',
        level2: {
          'new-key': 'val'
        },
        level3: 'level-3-value'
      });

      config.get('level1').should.be.eql('hello2');
      config.get('level2.level21').should.be.eql('hello2');
      config.get('level2.new-key').should.be.eql('val');
      config.get('level3').should.be.eql('level-3-value');
    });

    it('returns default value if original not found', function () {
      config.get('non-existing-value', 'default').should.be.eql('default');
    });

  });
});
