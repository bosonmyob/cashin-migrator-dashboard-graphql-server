const buildMigratedLedgerStatus = require('./buildMigratedLedgerStatus');

/**
 *
 * @param {Object} migratedLedger
 * @returns
 */
const buildMigratedLedger = ({
  id = null,
  migrated_business_id: migratedBusinessId = '',
  business_uid: businessUid = '',
  serial_number: serialNumber = '',
  ...rest
}) => ({
  id,
  migratedBusinessId,
  businessUid,
  serialNumber,
  status: buildMigratedLedgerStatus(rest)
});

module.exports = buildMigratedLedger;
