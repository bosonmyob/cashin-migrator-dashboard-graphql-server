const { STATUS } = require('../../config');

/**
 *
 * @param {Array} fields
 * @returns
 */
const _isFailed = fields =>
  fields.every(field => STATUS.FAILED.values.includes(field));

/**
 *
 * @param {Array} fields
 * @returns
 */
// const _isPending = fields =>
//   fields.every(field => STATUS.PENDING.values.includes(field));

/**
 *
 * @param {Array} fields
 * @returns
 */
const _isSuccess = fields =>
  fields.every(field => STATUS.SUCCESS.values.includes(field));

/**
 *
 * @param {Array} fields
 * @returns
 */
const getStatus = fields => {
  if (_isSuccess(fields)) {
    return STATUS.SUCCESS.name;
  }

  if (_isFailed(fields)) {
    return STATUS.FAILED.name;
  }

  return STATUS.PENDING.name;
};

module.exports = getStatus;
