const { ApolloServer, gql } = require('apollo-server-lambda');
const schema = require('../schema/types.graphql');

/**
 *
 * @param {Object} params
 * @param {Object} params.resolvers
 * @returns
 */
const init = ({ resolvers }) => {
  return new ApolloServer({
    typeDefs: gql`${schema}`,
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
