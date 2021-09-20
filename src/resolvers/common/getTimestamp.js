const moment = require('moment-timezone');
const { START_HOUR, DAY_DIFF } = require('../../config');

const TIME_ZONE = 'Australia/Melbourne';

const _getDefaultTimestamp = (hour, dayDiff) => {
  const timestamp = moment()
    .subtract(dayDiff, 'day')
    .tz(TIME_ZONE)
    .set({ hour: hour, minute: 0, second: 0, millisecond: 0 })
    .valueOf();

  return timestamp;
};

const getTimestamp = (date, dayDiff = DAY_DIFF) =>
  date
    ? moment(date).tz(TIME_ZONE).valueOf()
    : _getDefaultTimestamp(START_HOUR, dayDiff);

module.exports = getTimestamp;
