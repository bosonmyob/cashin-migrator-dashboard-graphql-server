/**
 *
 * @param {String} businessUid
 */
const getBusinessUidFilter = businessUid => businessUid ? [{
  key: 'business_uid',
  expression: 'businessUid',
  value: businessUid,
  ops: '='
}] : [];

module.exports = getBusinessUidFilter;
