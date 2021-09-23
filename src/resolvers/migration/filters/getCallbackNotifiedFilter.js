/**
 *
 * @param {Boolean} callBackNotified
 */
const getCallbackNotifiedFilter = callBackNotified => typeof callBackNotified === 'boolean'
  ? [
    {
      key: 'callback_notified',
      expression: 'callBackNotified',
      value: callBackNotified,
      ops: '='
    }
  ] : [];

module.exports = getCallbackNotifiedFilter;
