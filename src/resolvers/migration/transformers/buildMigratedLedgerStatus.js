const getStatus = require('../../common/getStatus');

/**
 *
 * @param {Object} status
 * @returns
 */
const _parseStatusString = status => {
  Object.keys(status).forEach(key => {
    status[key] = getStatus([status[key]]);
  });
  return status;
};

/**
 *
 * @param {Object} migratedLedgerRest
 * @returns
 */
const buildMigratedLedgerStatus = ({
  customers_migration_status: customers = 0,
  invoices_migration_status: invoices = 0,
  parse_ledger_migration_log_status: logParseStatus = 0,
  payment_config_status: paymentConfig = 0,
  reminder_business_preference_status: reminderBusinessPreference = 0
}) => _parseStatusString({
  logParseStatus,
  paymentConfig,
  customers,
  invoices,
  reminderBusinessPreference
});

module.exports = buildMigratedLedgerStatus;
