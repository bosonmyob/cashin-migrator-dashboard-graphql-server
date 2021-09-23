/**
 *
 * @param {Object} params
 * @param {String} params.startTime
 * @param {String} params.endTime
 * @param {Array} params.records
 * @returns
 */
const buildMigration = ({ startTime, endTime, records }) => ({
  startTime,
  endTime,
  count: records.length,
  records
});

module.exports = buildMigration;
