const { FLOW } = require('../../config');
const getTimestamp = require('../common/getTimestamp');
const getTimeStampFilter = require('./filters/getTimestampFilter');
const getSkippedFilter = require('./filters/getSkippedFilter');
const getTableName = require('../../dynamo/getTableName');
const getScanFilterParams = require('../../dynamo/getScanFilterParams');
const scanDB = require('../../dynamo/scanDB');
const buildMigration = require('./transformers/buildMigration');
const buildMigrationLedger = require('./transformers/buildMigrationLedger');

const _filterStatus = (ledgers, status) =>
  ledgers.filter(ledger => ledger.status.toLowerCase() === status.toLowerCase());

const _getMigration = async ({
  dbClient,
  startDate = '',
  endDate = '',
  status = '',
  skipped
}) => {
  const {
    startTime,
    endTime,
    startTimestamp,
    endTimestamp
  } = getTimestamp(startDate, endDate);
  const timestampFilter = getTimeStampFilter({ startTimestamp, endTimestamp });
  const skippedFilter = getSkippedFilter(skipped);

  const data = await scanDB({
    dbClient,
    tableName: getTableName(FLOW.MIGRATION),
    ...getScanFilterParams([
      ...timestampFilter,
      ...skippedFilter
    ])
  });

  const ledgers = data.map(buildMigrationLedger);
  const migration = {
    startTime,
    endTime,
    records: ledgers
  };

  if (status && ledgers.length) {
    migration.records = _filterStatus(ledgers, status);
  }

  return migration;
};

const getMigration = async ({ args, context }) => {
  const migration = await _getMigration({
    ...args,
    ...context
  });

  return buildMigration(migration);
};

module.exports = getMigration;
