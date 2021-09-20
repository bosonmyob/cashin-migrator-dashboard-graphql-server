const { FLOW, STAGE } = require('./src/config');
const getResolvers = require('./src/resolvers/getResolvers');
const { init, initLocal } = require('./src/apollo');

const resolvers = getResolvers(FLOW.MIGRATION);

if (STAGE === 'local') {
  const server = initLocal({ resolvers });

  server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`));
} else {
  const cors = {
    origin: '*',
    credentials: true
  };
  const server = init({ resolvers });

  exports.graphqlHandler = server.createHandler({ cors });
}
