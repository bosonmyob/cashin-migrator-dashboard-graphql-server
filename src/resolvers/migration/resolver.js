const moment = require('moment-timezone');
const { STATUSES: { MIGRATION: fields } } = require('../../config');
const dynamoHelper = require('../../dynamo/helper');

const SUCCESS_VALUES = [2, 3];

const getMigrationStatus = fields =>
  fields.every(field => SUCCESS_VALUES.includes(fields));

const _buildMigration = ({
  id,
  migrated_business_id: companyId,
  skip_ledger_migration: skipped,
  callback_notified: callbackNotified,
  timestamp,
  status
}) => ({
  id,
  companyId,
  status,
  skipped,
  callbackNotified,
  timestamp
});

const _getTimestamp = (hour, dayDiff = 0) => {
  const timestamp = moment()
    .add(dayDiff, 'day')
    .tz('Australia/Melbourne')
    .set({ hour: hour, minute: 0, second: 0, millisecond: 0 })
    .valueOf();

  return timestamp;
};

const getDataFromDynamoDB = async ({
  startDate = null,
  endDate = null
}) => {
  const helper = dynamoHelper();
  const startTimestamp = startDate ? moment(startDate).tz('Australia/Melbourne').valueOf() : _getTimestamp(9, -365);
  const endTimestamp = endDate ? moment(endDate).tz('Australia/Melbourne').valueOf() : _getTimestamp(9);

  const { migrationLedgers } = await helper.doit({
    startTimestamp,
    endTimestamp
  });

  console.log({ startDate, endDate, migrationLedgers });

  return migrationLedgers;
};

const _getMigration = (queryParams) => {
  const data = getDataFromDynamoDB(queryParams);
  return _buildMigration(data);
};

const resolvers = {
  Query: {
    migration: async (parents, queryParams) => _getMigration(queryParams)
  }
};

module.exports = resolvers;
