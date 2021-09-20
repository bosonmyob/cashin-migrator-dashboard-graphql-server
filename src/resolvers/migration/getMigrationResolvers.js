const { FLOW } = require('../../config');
const buildMigrationData = require('./buildMigrationData');
const getDataFromDynamoDB = require('../../dynamo/getData');
const getTimestamp = require('./getTimestamp');

const _getMigratedLedgers = async queryParams => {
  const timestamps = {
    startDate: queryParams?.startDate || '',
    endDate: queryParams?.endDate || ''
  };

  const migratedLedgers = await getDataFromDynamoDB({
    flow: FLOW.MIGRATION,
    ...getTimestamp(timestamps)
  });

  return migratedLedgers.map(buildMigrationData);
};

const getMigrationResolvers = () => ({
  Query: {
    migration: async (parents, queryParams) =>
      await _getMigratedLedgers(queryParams)
  }
});

module.exports = getMigrationResolvers;
