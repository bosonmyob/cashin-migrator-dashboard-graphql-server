/**
 *
 * @param {Array} fields
 * @returns
 */
const getScanFilterParams = fields => {
  // if no fields passed in
  if (fields.length === 0) {
    return {};
  }

  const filters = [];
  const names = {};
  const values = {};

  fields.forEach(field => {
    const { key, expression, value, ops } = field;
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

module.exports = getScanFilterParams;
