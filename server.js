const { ApolloServer, gql } = require('apollo-server-lambda');
const moment = require('moment-timezone');

const dbHandler = require('./src/dynamo/dbHandler');
const configs = require('./src/config');

const _getTimestamp = (hour, dayDiff = 0) => {
  const timestamp = moment()
    .add(dayDiff, 'day')
    .tz('Australia/Melbourne')
    .set({ hour: hour, minute: 0, second: 0, millisecond: 0 })
    .valueOf();

  return timestamp;
};

const getDataFromDynamoDB = async (queryParams = {}) => {
  const handler = dbHandler();
  const startDate = queryParams.startDate ? moment(queryParams.startDate).tz('Australia/Melbourne').valueOf() : _getTimestamp(9, -365);
  const endDate = queryParams.endDate ? moment(queryParams.endDate).tz('Australia/Melbourne').valueOf() : _getTimestamp(9);

  const {
    migrationLedgers
    // rollbackLedgers
  } = await handler.doit({
    startTimestamp: startDate,
    endTimestamp: endDate,
    configs
  });

  console.log({ startDate, endDate, migrationLedgers });

  return migrationLedgers;
};

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Migration {
    id: String
    companyId: String
    customerId: String
    status: String
    dateTime: String
  }
  
  type Query {
    migration(startDate: String, endDate: String): [Migration]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    migration: async (parents, queryParams) => getDataFromDynamoDB(queryParams)
  }
};

const cors = {
  origin: '*',
  credentials: true
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  })
});

exports.graphqlHandler = server.createHandler({ cors });
