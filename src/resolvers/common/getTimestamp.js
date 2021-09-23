const moment = require('moment-timezone');
const { START_HOUR, DAY_DIFF, DATE_TIME_FORMAT } = require('../../config');

const TIME_ZONE = 'Australia/Melbourne';

const _getDefaultDate = (hour, dayDiff) => {
  const timestamp = moment()
    .subtract(dayDiff, 'day')
    .tz(TIME_ZONE)
    .set({ hour: hour, minute: 0, second: 0, millisecond: 0 });

  return timestamp;
};

const _getDate = (date, dayDiff = DAY_DIFF) =>
  date
    ? moment(date).tz(TIME_ZONE)
    : _getDefaultDate(START_HOUR, dayDiff);

const getTimestamp = (startDateString, endDateString) => {
  const startDate = _getDate(startDateString);
  const endDate = _getDate(endDateString, 0);

  return {
    startTime: startDate.format(DATE_TIME_FORMAT),
    endTime: endDate.format(DATE_TIME_FORMAT),
    startTimestamp: startDate.valueOf(),
    endTimestamp: endDate.valueOf()
  };
};

module.exports = getTimestamp;
