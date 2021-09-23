/**
 *
 * @param {String} jobId
 */
const getJobIdFilter = jobId => jobId ? [{
  key: 'id',
  expression: 'jobId',
  value: jobId,
  ops: '='
}] : [];

module.exports = getJobIdFilter;
