const typeDefs = `
  type Query {
    migration(startDate: String, endDate: String): [Ledgers]
    ledger(jobId: String, migratedBusinessId: String, businessUid: String): Ledger
  }

  type Ledgers {
    id: String!
    companyId: String!
    status: String
    skipped: Boolean
    callbackNotified: Boolean
    dateTime: String!
  }

  type Ledger {
    id: String!
    companyId: String!
    status: String
    skipped: Boolean
    callbackNotified: Boolean
    dateTime: String!
  }
`;

module.exports = typeDefs;
