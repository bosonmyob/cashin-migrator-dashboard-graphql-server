const { FLOW } = require('../../config');
const buildMigrationData = require('./buildMigrationData');
const getDataFromDynamoDB = require('../../dynamo/getData');
const getTimestamp = require('./getTimestamp');

const _getMigratedLedgers = async ({ args, context }) => {
  const timestamps = {
    startDate: args?.startDate || '',
    endDate: args?.endDate || ''
  };

  const migratedLedgers = await getDataFromDynamoDB({
    flow: FLOW.MIGRATION,
    ...getTimestamp(timestamps),
    ...context
  });

  return migratedLedgers.map(buildMigrationData);
};

const getMigrationResolvers = () => ({
  Query: {
    migration: async (parents, args, context, info) => {
      return await _getMigratedLedgers({ args, context });
    }
  }
});

module.exports = getMigrationResolvers;
