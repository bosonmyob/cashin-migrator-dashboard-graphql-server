const { ApolloServer, gql } = require('apollo-server-lambda');
const typeDefs = require('../schema/schema.js');

/**
 *
 * @param {Object} params
 * @param {Object} params.resolvers
 * @returns
 */
const init = ({ resolvers }) => {
  return new ApolloServer({
    typeDefs: gql`${typeDefs}`,
    resolvers,
    context: ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context
    })
  });
};

module.exports = init;
