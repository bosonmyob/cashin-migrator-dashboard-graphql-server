/**
 *
 * @param {object} options
 */
const _scan = async ({ dbClient, ...options }) => {
  let hasMore = true;
  let items = [];

  while (hasMore) {
    const result = await dbClient.scan(options).promise();
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
const scanDB = async ({ dbClient, tableName, filter, names, values }) =>
  await _scan({
    dbClient,
    TableName: tableName,
    FilterExpression: filter,
    ExpressionAttributeNames: names,
    ExpressionAttributeValues: values
  });

module.exports = scanDB;
