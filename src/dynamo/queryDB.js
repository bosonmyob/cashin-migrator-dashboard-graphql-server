/**
 *
 * @param {object} options
 */
const _query = async ({ dbClient, ...options }) => {
  const result = await dbClient.query(options).promise();
  const items = result?.Items || false;
  const item = items ? items[0] : false;

  return item;
};

/**
 *
 * @param {object} params
 * @param {object} params.payload
 */
const queryDB = async ({
  dbClient,
  tableName,
  expression,
  names,
  values
}) =>
  await _query({
    dbClient,
    TableName: tableName,
    KeyConditionExpression: expression,
    ExpressionAttributeNames: names,
    ExpressionAttributeValues: values
  });

module.exports = queryDB;
