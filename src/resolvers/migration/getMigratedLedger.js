const { FLOW } = require('../../config');
const getTableName = require('../../dynamo/getTableName');
const getScanFilterParams = require('../../dynamo/getScanFilterParams');
const getQueryFilterParams = require('../../dynamo/getQueryFilterParams');
const scanDB = require('../../dynamo/scanDB');
const queryDB = require('../../dynamo/queryDB');
const buildMigratedLedger = require('./transformers/buildMigratedLedger');
const getMigratedBusinessIdFilter = require('./filters/getMigratedBusinessIdFilter');
const getBusinessUidFilter = require('./filters/getBusinessUidFilter');
const getSerialNumberFilter = require('./filters/getSerialNumberFilter');
const getJobIdFilter = require('./filters/getJobIdFilter');

const _validateQueryParams = ({
  jobId,
  migratedBusinessId,
  businessUid,
  serialNumber
}) =>
  jobId || migratedBusinessId || businessUid || serialNumber;

const _getMigratedLedger = async ({
  dbClient,
  jobId = 0,
  migratedBusinessId = '',
  businessUid = '',
  serialNumber = ''
}) => {
  const tableName = getTableName(FLOW.MIGRATION);

  if (!_validateQueryParams({ jobId, migratedBusinessId, businessUid, serialNumber })) {
    return false;
  }

  const data = jobId
    ? await queryDB({
      dbClient,
      tableName,
      ...getQueryFilterParams(getJobIdFilter(jobId))
    })
    : await scanDB({
      dbClient,
      tableName,
      ...getScanFilterParams([
        ...getMigratedBusinessIdFilter(migratedBusinessId),
        ...getBusinessUidFilter(businessUid),
        ...getSerialNumberFilter(serialNumber)
      ])
    });

  return Array.isArray(data) ? data.pop() : data;
};

const getMigratedLedger = async ({ args, context }) => {
  const ledger = await _getMigratedLedger({ ...args, ...context });

  return ledger ? [buildMigratedLedger(ledger)] : [];
};

module.exports = getMigratedLedger;
