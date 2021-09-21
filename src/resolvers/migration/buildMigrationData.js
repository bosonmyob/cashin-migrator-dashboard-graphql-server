const { FLOW } = require('../../config');
const getDateTime = require('../common/getDateTime');
const getStatus = require('../common/getStatus');
const getStatusFieldValues = require('../common/getStatusFieldValues');

/**
 *
 * @param {Object} migratedLedger
 * @returns
 */
const buildMigrationData = migratedLedger => {
  const {
    id = null,
    migrated_business_id: companyId = null,
    skip_ledger_migration: skipped = false,
    callback_notified: callbackNotified = false,
    timestamp = null
  } = migratedLedger;

  const status = getStatus(getStatusFieldValues(migratedLedger, FLOW.MIGRATION));
  const dateTime = getDateTime(timestamp);

  return {
    id,
    companyId,
    status,
    skipped,
    callbackNotified,
    dateTime
  };
};

module.exports = buildMigrationData;
