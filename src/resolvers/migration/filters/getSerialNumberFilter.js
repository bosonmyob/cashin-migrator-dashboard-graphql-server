/**
 *
 * @param {String} serialNumber
 */
const getSerialNumberFilter = serialNumber => serialNumber ? [{
  key: 'serial_number',
  expression: 'serialNumber',
  value: serialNumber,
  ops: '='
}] : [];

module.exports = getSerialNumberFilter;
