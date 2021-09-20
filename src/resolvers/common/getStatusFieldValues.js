const { FLOW, STATUSES } = require('../config');

const _getStatusFields = flow =>
  flow === FLOW.MIGRATION
    ? STATUSES.MIGRATION
    : STATUSES.ROLLBACK;

const getStatusFieldValues = (migratedLedger, flow) => {
  const statusFields = _getStatusFields(flow);

  return statusFields.map(field => migratedLedger[field]);
};

module.exports = getStatusFieldValues;
