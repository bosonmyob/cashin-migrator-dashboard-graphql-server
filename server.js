const { FLOW } = require('./src/config');
const getResolvers = require('./src/resolvers/getResolvers');
const init = require('./src/apollo');

const cors = {
  origin: '*',
  credentials: true
};

const server = init({
  resolvers: getResolvers(FLOW.MIGRATION)
});

exports.graphqlHandler = server.createHandler({ cors });
