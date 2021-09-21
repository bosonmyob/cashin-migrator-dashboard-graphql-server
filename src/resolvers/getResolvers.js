const getMigration = require('./migration/getMigration');

const getResolvers = () => ({
  Query: {
    migration: async (parents, args, context) =>
      await getMigration({ parents, args, context })
  }
});

module.exports = getResolvers;
