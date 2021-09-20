const { ApolloServer, gql } = require('apollo-server-lambda');
const { ApolloServer: ApolloServerLocal } = require('apollo-server');
const schema = require('../schema/schema.js');

const typeDefs = gql`${schema}`;

/**
 *
 * @param {Object} params
 * @param {Object} params.resolvers
 * @returns
 */
const init = ({ resolvers }) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context
    })
  });

/**
 *
 * @param {Object} params
 * @param {Object} params.resolvers
 * @returns
 */
const initLocal = ({ resolvers }) =>
  new ApolloServerLocal({
    typeDefs,
    resolvers
  });

module.exports = {
  init,
  initLocal
};
