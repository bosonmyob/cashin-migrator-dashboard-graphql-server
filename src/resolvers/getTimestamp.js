const moment = require('moment-timezone');
const { START_HOUR } = require('../config');

const TIME_ZONE = 'Australia/Melbourne';

const _getDefaultTimestamp = (hour, dayDiff = 0) => {
  const timestamp = moment()
    .add(dayDiff, 'day')
    .tz(TIME_ZONE)
    .set({ hour: hour, minute: 0, second: 0, millisecond: 0 })
    .valueOf();

  return timestamp;
};

const getTimestamp = date => {
  return date
    ? moment(date).tz(TIME_ZONE).valueOf()
    : _getDefaultTimestamp(START_HOUR, 1);
};

module.exports = getTimestamp;
