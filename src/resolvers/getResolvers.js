const getMigratedLedger = require('./migration/getMigratedLedger');
const getMigration = require('./migration/getMigration');

const getResolvers = () => ({
  Query: {
    migration: async (parent, args, context) =>
      await getMigration({ args, context }),
    migratedLedger: async (parent, args, context) =>
      await getMigratedLedger({ args, context })
  },
  Migration: {
    records (parent) {
      return parent.records;
    }
  }
});

module.exports = getResolvers;
