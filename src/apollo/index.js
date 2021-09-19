const { ApolloServer, gql } = require('apollo-server-lambda');
const s

const getSchema = schema => gql`${schema}`;

const init = ({ typeDefs, resolvers }) => {
  return new ApolloServer({
    typeDefs: getSchema(),
    resolvers,
    context: ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context
    })
  });
};

module.exports = {
  init,
  gql
};
