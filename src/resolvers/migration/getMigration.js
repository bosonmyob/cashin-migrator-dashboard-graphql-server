const { FLOW } = require('../../config');
const buildMigrationLedger = require('./transformers/buildMigrationLedger');
const getTimestamp = require('../common/getTimestamp');
const getTimeStampFilter = require('./filters/getTimestampFilter');
const getSkippedFilter = require('./filters/getSkippedFilter');
const getTableName = require('../../dynamo/getTableName');
const getScanFilterParams = require('../../dynamo/getScanFilterParams');
const scanDB = require('../../dynamo/scanDB');

const _getDataFromDynamoDB = async ({
  startTimestamp,
  endTimestamp,
  skipped,
  dbClient
}) => {
  const timestampFilter = getTimeStampFilter({ startTimestamp, endTimestamp });
  const skippedFilter = getSkippedFilter(skipped);

  return await scanDB({
    dbClient,
    tableName: getTableName(FLOW.MIGRATION),
    ...getScanFilterParams([
      ...timestampFilter,
      ...skippedFilter
    ])
  });
};

const getMigration = async ({ parents, args, context }) => {
  const timestamps = {
    startDate: args?.startDate || '',
    endDate: args?.endDate || ''
  };

  console.log({ args });

  const migratedLedgers = await _getDataFromDynamoDB({
    ...getTimestamp(timestamps),
    ...args,
    ...context
  });

  return migratedLedgers.map(buildMigrationLedger);
};

module.exports = getMigration;
