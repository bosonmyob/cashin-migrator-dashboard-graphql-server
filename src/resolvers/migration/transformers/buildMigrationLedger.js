const { FLOW } = require('../../../config');
const getDateTime = require('../../common/getDateTime');
const getStatus = require('../../common/getStatus');
const getStatusFieldValues = require('../../common/getStatusFieldValues');
const buildMigratedLedger = require('./buildMigratedLedger');

/**
 *
 * @param {Object} migratedLedger
 * @returns
 */
const buildMigrationLedger = migratedLedger => {
  const {
    skip_ledger_migration: skipped = false,
    callback_notified: callbackNotified = false,
    timestamp = null
  } = migratedLedger;

  const status = getStatus(getStatusFieldValues(migratedLedger, FLOW.MIGRATION));
  const dateTime = getDateTime(timestamp);

  return {
    skipped,
    status,
    callbackNotified,
    dateTime,
    ledger: buildMigratedLedger(migratedLedger)
  };
};

module.exports = buildMigrationLedger;
