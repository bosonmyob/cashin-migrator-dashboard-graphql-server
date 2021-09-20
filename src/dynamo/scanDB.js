const AWS = require('aws-sdk');
const { REGION } = require('../config');

const _getDocDBClient = () =>
  new AWS.DynamoDB.DocumentClient({
    region: REGION
  });

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
    const resItems = result?.Items || [];

    if (result.LastEvaluatedKey) {
      options.ExclusiveStartKey = result.LastEvaluatedKey;
    } else {
      hasMore = false;
    }

    items = [...items, ...resItems];
  }

  return items;
};

/**
 *
 * @param {object} params
 * @param {object} params.payload
 */
const scanDB = async ({ tableName, filter, names, values }) =>
  await _scan({
    TableName: tableName,
    FilterExpression: filter,
    ExpressionAttributeNames: names,
    ExpressionAttributeValues: values
  });

module.exports = scanDB;
