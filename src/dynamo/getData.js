const getScanFilterParams = require('./getScanFilterParams');
const getScanFilters = require('./getScanFilters');
const getTableName = require('./getTableName');
const scanDB = require('./scanDB');

const getDataFromDynamoDB = async ({
  startTimestamp,
  endTimestamp,
  flow,
  dbClient
}) =>
  await scanDB({
    dbClient,
    tableName: getTableName(flow),
    ...getScanFilterParams(getScanFilters({ startTimestamp, endTimestamp }))
  });

module.exports = getDataFromDynamoDB;
