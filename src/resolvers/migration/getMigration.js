const { FLOW } = require('../../config');
const getTimestamp = require('../common/getTimestamp');
const getTimeStampFilter = require('./filters/getTimestampFilter');
const getSkippedFilter = require('./filters/getSkippedFilter');
const getTableName = require('../../dynamo/getTableName');
const getScanFilterParams = require('../../dynamo/getScanFilterParams');
const scanDB = require('../../dynamo/scanDB');
const buildMigration = require('./transformers/buildMigration');

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

const getMigration = async ({ args, context }) => {
  const dates = getTimestamp(args?.startDate || '', args?.endDate || '');

  const migratedLedgers = await _getDataFromDynamoDB({
    ...dates,
    ...args,
    ...context
  });

  return buildMigration({ ...dates, ledgers: migratedLedgers });
};

module.exports = getMigration;
