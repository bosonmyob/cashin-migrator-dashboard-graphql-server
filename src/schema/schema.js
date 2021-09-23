const typeDefs = `
  type Query {
    migration (
        startDate: String,
        endDate: String
        skipped: Boolean
        status: String
      ): Migration!

    migratedLedger (
        jobId: String,
        migratedBusinessId: String,
        businessUid: String,
        serialNumber: String
      ): [MigratedLedger!]
  }

  type Migration {
    startTime: String!
    endTime: String!
    count: Int!
    records: [MigrationRecord!]
  }

  type MigrationRecord {
    skipped: Boolean!
    status: String!
    callbackNotified: Boolean!
    dateTime: String!
    record: MigratedLedger!
  }

  type MigratedLedger {
    id: String!
    migratedBusinessId: String!
    businessUid: String!
    serialNumber: String!
    status: MigratedLedgerStatus!
  }

  type MigratedLedgerStatus {
    logParseStatus: String!
    paymentConfig: String!
    customers: String!
    invoices: String!
    reminderBusinessPreference: String!
  }
`;

module.exports = typeDefs;
