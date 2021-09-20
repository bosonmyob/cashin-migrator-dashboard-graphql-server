const getScanFilterParams = require('./getScanFilterParams');
const getScanFilters = require('./getScanFilters');
const getTableName = require('./getTableName');
const scanDB = require('./scanDB');

const getDataFromDynamoDB = async ({
  startTimestamp,
  endTimestamp,
  flow
}) => {
  const fields = getScanFilters({ startTimestamp, endTimestamp });
  const { filter, names, values } = getScanFilterParams({ fields });
  const tableName = getTableName(flow);

  return await scanDB({ tableName, filter, names, values });
};

module.exports = getDataFromDynamoDB;
