const { FLOW, STAGE } = require('./src/config');
const getResolvers = require('./src/resolvers/getResolvers');
const { init, initLocal } = require('./src/apollo');

const resolvers = getResolvers(FLOW.MIGRATION);

const startServer = (server) => {
  if (server) {
    server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`));
  } else {
    const server = init({ resolvers });
    return server.createHandler();
  }
};

exports.graphqlHandler = startServer();

if (STAGE === 'local') {
  const server = initLocal({ resolvers });
  startServer(server);
}
