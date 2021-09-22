const excludedOperationNames = [
  'IntrospectionQuery'
];

const logger = {
  async serverWillStart () {
    // console.log('Server starting up!');
  },

  async requestDidStart (requestContext) {
    const { operationName, variables } = requestContext.request;

    if (!excludedOperationNames.includes(operationName)) {
      console.log({
        operationName,
        variables,
        context: requestContext.context
      });
    }
  }
};

module.exports = logger;
