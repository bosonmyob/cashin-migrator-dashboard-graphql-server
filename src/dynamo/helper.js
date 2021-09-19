const _ = require('lodash');
const AWS = require('aws-sdk');
const moment = require('moment-timezone');

const configs = require('../config');

module.exports = () => ({
  async doit ({ startTimestamp, endTimestamp, flow = 'migration' }) {
    return _getDataFromDynamoDB({
      startTimestamp,
      endTimestamp,
      flow
    });
  }
});

const _getDocDBClient = () => {
  return new AWS.DynamoDB.DocumentClient({
    region: configs.REGION
  });
};

/**
 *
 * @param {object} params
 * @param {array} params.fields
 */
const _buildScanFilterParams = ({ fields }) => {
  const filters = [];
  const names = {}; const values = {};

  _.forEach(fields, field => {
    const { key, value, expression, ops } = field;
    const keyName = expression || key;

    filters.push(`#${keyName} ${ops} :${keyName}`);
    names[`#${keyName}`] = key;
    values[`:${keyName}`] = value;
  });

  return {
    filter: filters.join(' and '),
    names,
    values
  };
};

/**
 *
 * @param {object} params
 * @param {object} params.payload
 */
const _scanDB = async ({ tableName, fields }) => {
  const { filter, names, values } = _buildScanFilterParams({ fields });

  return await _scan({
    TableName: tableName,
    FilterExpression: filter,
    ExpressionAttributeNames: names,
    ExpressionAttributeValues: values
  });
};

/**
 *
 * @param {object} options
 */
const _scan = async (options) => {
  const docDBClient = _getDocDBClient();
  let hasMore = true;
  let items = [];

  while (hasMore) {
    const result = await docDBClient.scan(options).promise();
    const resItems = _.get(result, 'Items', []);

    if (!_.isUndefined(result.LastEvaluatedKey)) {
      options.ExclusiveStartKey = result.LastEvaluatedKey;
    } else {
      hasMore = false;
    }

    items = [...items, ...resItems.map(resItem => ({
      ...resItem,
      companyId: resItem.migrated_business_id,
      customerId: resItem.customerId || '',
      status: resItem.status || '',
      dateTime: resItem.timestamp ? moment(resItem.timestamp).format('YYYY-MM-DD HH:mm:ss') : ''
    }))];
  }

  return items;
};

/**
 *
 * @param {object} params
 * @param {number} params.startTimestamp
 * @param {number} params.endTimestamp
 */
const _getScanFilters = ({ startTimestamp, endTimestamp }) => ({
  fields: [
    {
      key: 'timestamp',
      expression: 'startTimestamp',
      value: startTimestamp,
      ops: '>='
    },
    {
      key: 'timestamp',
      expression: 'endTimestamp',
      value: endTimestamp,
      ops: '<='
    }
  ]
});

const _getDataFromDynamoDB = async ({
  startTimestamp,
  endTimestamp,
  flow
}) => {
  const params = _getScanFilters({ startTimestamp, endTimestamp });
  const tableName = flow === 'migration'
    ? configs.TABLES.MIGRATION_LEDGER
    : configs.TABLES.ROLLBACK_MIGRATION_LEDGER;

  return await _scanDB({ ...params, tableName });
};
