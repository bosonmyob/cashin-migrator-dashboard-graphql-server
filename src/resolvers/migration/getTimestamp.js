const getTimestamp = require('../common/getTimestamp');

module.exports = ({ startDate, endDate }) => ({
  startTimestamp: getTimestamp(startDate),
  endTimestamp: getTimestamp(endDate, 0)
});
