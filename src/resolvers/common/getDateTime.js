const moment = require('moment-timezone');
const { DATE_TIME_FORMAT } = require('../../config');

/**
 *
 * @param {String|null} timestamp
 * @returns
 */
const getDateTime = timestamp =>
  timestamp
    ? moment(timestamp).format(DATE_TIME_FORMAT)
    : '';

module.exports = getDateTime;
