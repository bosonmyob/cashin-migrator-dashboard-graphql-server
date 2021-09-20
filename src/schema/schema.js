const typeDefs = `
  type Query {
    migration(startDate: String, endDate: String): [Migration]
  }

  type Migration {
    id: String
    companyId: String
    status: String
    skipped: Boolean
    callbackNotified: Boolean
    dateTime: String
  }
`;

module.exports = typeDefs;