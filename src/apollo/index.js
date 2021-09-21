const AWS = require('aws-sdk');
const { REGION } = require('../config.js');
const { ApolloServer, gql } = require('apollo-server-lambda');
const schema = require('../schema/schema.js');

const typeDefs = gql`${schema}`;

const dbClient = new AWS.DynamoDB.DocumentClient({
  region: REGION
});

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
      dbClient,
      headers: event.headers,
      functionName: context.functionName,
      event,
      context
    }),
    cors: {
      origin: '*',
      credentials: true
    }
  });

/**
 *
 * @param {Object} params
 * @param {Object} params.resolvers
 * @returns
 */
const initLocal = ({ resolvers }) => {
  try {
    const { ApolloServer: ApolloServerLocal } = require('apollo-server');

    return new ApolloServerLocal({
      typeDefs,
      resolvers,
      context: () => ({
        dbClient
      })
    });
  } catch ({ errorMessage = 'unexpected error when initLocal' }) {
    console.log(errorMessage);
  }
};

module.exports = {
  init,
  initLocal
};
