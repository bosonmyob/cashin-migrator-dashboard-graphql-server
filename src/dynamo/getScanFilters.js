/**
 *
 * @param {object} params
 * @param {number} params.startTimestamp
 * @param {number} params.endTimestamp
 */
const getScanFilters = ({ startTimestamp, endTimestamp }) => [
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
];

module.exports = getScanFilters;
