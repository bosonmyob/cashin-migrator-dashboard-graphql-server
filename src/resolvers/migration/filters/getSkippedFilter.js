/**
 *
 * @param {Boolean} skipped
 */
const getSkippedFilter = skipped => typeof skipped === 'boolean'
  ? [
    {
      key: 'skip_ledger_migration',
      expression: 'skipped',
      value: skipped,
      ops: '='
    }
  ] : [];

module.exports = getSkippedFilter;
