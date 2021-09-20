const { FLOW } = require('../config');
const getMigrationResolvers = require('./migration/getMigrationResolvers');

/**
 *
 * @param {String} flow
 * @returns
 */
const getResolvers = flow =>
  flow === FLOW.MIGRATION
    ? getMigrationResolvers()
    : null;

module.exports = getResolvers;
