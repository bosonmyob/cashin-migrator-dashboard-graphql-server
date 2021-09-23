const buildMigrationLedger = require('./buildMigrationLedger');

/**
 *
 * @param {Object} params
 * @param {String} params.startTime
 * @param {String} params.endTime
 * @param {Array} params.ledgers
 * @returns
 */
const buildMigration = ({ startTime, endTime, ledgers }) => ({
  startTime,
  endTime,
  count: ledgers.length,
  ledgers: ledgers.map(buildMigrationLedger)
});

module.exports = buildMigration;
