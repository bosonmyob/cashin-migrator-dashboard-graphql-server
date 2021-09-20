const { FLOW } = require('../../config');
const buildMigrationData = require('./buildMigrationData');
const getDataFromDynamoDB = require('../../dynamo/getData');
const getTimestamp = require('./getTimestamp');

const getMigrationResolvers = () => ({
  Query: {
    migration: async (parents, queryParams) => {
      const migratedLedgers = await getDataFromDynamoDB({
        ...getTimestamp(queryParams),
        flow: FLOW.MIGRATION
      });

      return migratedLedgers.map(buildMigrationData);
    }
  }
});

module.exports = getMigrationResolvers;
