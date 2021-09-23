/**
 *
 * @param {String} migratedBusinessId
 */
const getMigratedBusinessIdFilter = migratedBusinessId => migratedBusinessId ? [{
  key: 'migrated_business_id',
  expression: 'migratedBusinessId',
  value: migratedBusinessId,
  ops: '='
}] : [];

module.exports = getMigratedBusinessIdFilter;
