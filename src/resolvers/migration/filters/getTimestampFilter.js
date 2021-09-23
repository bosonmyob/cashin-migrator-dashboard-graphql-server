/**
 *
 * @param {Object} params
 * @param {String} params.startDate
 * @param {String} params.endDate
 */
const getTimeStampFilter = ({ startTimestamp, endTimestamp }) => (startTimestamp && endTimestamp) ? [
  {
    key: 'timestamp',
    expression: 'startTimestamp',
    value: startTimestamp,
    ops: '>='
  },
  {
    key: 'timestamp',
    expression: 'endTimestamp',
    value: endTimestamp,
    ops: '<='
  }
] : [];

module.exports = getTimeStampFilter;
