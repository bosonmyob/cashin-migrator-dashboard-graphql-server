/**
 *
 * @param {Object} params
 * @param {String} params.startDate
 * @param {String} params.endDate
 */
const getSkippedFilter = (skipped) => skipped
  ? [
    {
      key: 'skip_ledger_migration',
      expression: 'skipped',
      value: skipped,
      ops: '='
    }
  ] : [];

module.exports = getSkippedFilter;
