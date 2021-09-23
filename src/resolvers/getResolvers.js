const getMigration = require('./migration/getMigration');

const getResolvers = () => ({
  Query: {
    migration: async (parent, args, context) =>
      await getMigration({ args, context }),
    migratedLedger: async (parent, args, context) => {

    }
  },
  Migration: {
    ledgers (parent) {
      return parent.ledgers;
    }
  }
});

module.exports = getResolvers;
