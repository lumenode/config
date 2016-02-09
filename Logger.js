'use strict';

class Logger {

  constructor(Config, basePath, logger) {
    if (!basePath) throw Error('Specify basePath, please.');

    this.basePath = basePath;
    this.logger = logger || require('log4js');

    if (Config.get('app.logToConsole')) {
      this.logger.loadAppender('console');
    }

    this.logger.loadAppender('file');

    this.configure();

    this.addAppender('info', 'logs/');
    this.addAppender('error', 'logs/');
    this.addAppender('warning', 'logs/');
    this.addAppender('debug', 'logs/');
  }

  /**
   * Configure base logger.
   * The first thing we wanna manage is - write to console or not
   * for example while executing tests (to have nice and pretty tests)
   *
   * @return {void}
   */
  configure() {
    var appenders = [];

    appenders.push({
      type: 'console'
    });

    this.logger.configure({
      appenders: appenders
    });
  }

  /**
   * Add file appender.
   *
   * @param {String} appender Name of the log file
   * @param {String} path     Log file path
   */
  addAppender(appender, path) {
    path = path || '';
    var logPath = this.basePath + '/storage/' + path + appender + '.log';

    this.logger.addAppender(this.logger.appenders.file(logPath), appender);
  }

  /**
   * Simply write message to the console
   *
   * @param  {String} logger  Logger name
   * @param  {String} message Message to be posted
   * @return {Boolean}        Result of the operation
   */
  log(logger, message) {
    message = '\n' + message + '\n';

    return this.logger.getLogger(logger).debug(message);
  }

  /**
   * Check if logger with given name exists
   *
   * @param  {String} logger Logger name
   * @return {Boolean}
   */
  loggerExists(logger) {
    return this.logger.hasLogger(logger);
  }

  /**
   * Create report file.
   * Basically, here we will create new appender for reports if
   * it does not exists and then simply log to the file.
   *
   * @param  {String} logger  Logger name
   * @param  {String} message Message to be posted
   * @return {Boolean}
   */
  report(logger, message) {
    if (!this.loggerExists(logger)) {
      this.addAppender(logger, 'reports/');
    }

    return this.log(logger, message);
  }

}

module.exports = Logger;
