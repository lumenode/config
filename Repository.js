'use strict';

let _ = require('lodash');

class Config {

  constructor() {
    this.data = {};
  }

  /**
   * Get all the values from config
   *
   * @return {*} All the config data
   */
  all() {
    return this.data;
  }

  /**
   * Loads pack of data and merges it
   *
   * @param  {*}      data Data to be merged
   * @return {void}
   */
  load(data) {
    let merge = (a, b) => {
      if (_.isArray(a)) {
        return a.concat(b);
      }
    }

    _.merge(this.data, data, merge);
  }

  /**
   * Sets the property value of path on object.
   * If a portion of path does not exist it’s created.
   *
   * @param {Array|String} path   The path of the property to set.
   * @param {*}            value  The value to set.
   */
  set(path, value) {
    _.set(this.data, path, value);
  }

  /**
   * Gets the property value at path of object.
   * If the resolved value is undefined the defaultValue is used in its place.
   *
   * @param  {Array|String} path         The path of the property to get.
   * @param  {*}            defaultValue The value returned if the resolved value is undefined.
   * @return {*}                         Returns the resolved value.
   */
  get(path, defaultValue) {
    return _.get(this.data, path, defaultValue);
  }

}

module.exports = Config;
