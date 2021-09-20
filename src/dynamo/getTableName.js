const { FLOW, TABLES } = require('../config');

/**
 *
 * @param {string} flow
 * @returns
 */
const getTableName = flow =>
  flow === FLOW.MIGRATION
    ? TABLES.MIGRATION_LEDGER
    : TABLES.ROLLBACK_MIGRATION_LEDGER;

module.exports = getTableName;
