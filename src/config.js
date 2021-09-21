/**
 * AWS services global env
 */
module.exports.REGION = process.env?.REGION || 'ap-southeast-2';
module.exports.STAGE = process.env?.STAGE || 'dev';

/**
 * DB query start & end time
 */
// start hour is 9.00 AM the previous day
module.exports.START_HOUR = process.env?.START_HOUR || 9;
// start hour is 9.00 AM the current day
module.exports.END_HOUR = process.env?.END_HOUR || 9;
// setting a day difference for default get timestamp
module.exports.DAY_DIFF = process.env?.DAY_DIFF || 3;
// date time format
module.exports.DATE_TIME_FORMAT = process.env?.DATE_TIME_FORMAT || 'YYYY-MM-DD HH:mm:ss';

/**
 * Dynamo DB tables, loaded from lambda environment variables and given default values
 * Default values are not required. Expected to throw an error if the DB is undefined
 * If running in local mode, it defaults to SIT database
 */
module.exports.TABLES = Object.freeze({
  MIGRATION_LEDGER: process.env?.MIGRATION_LEDGER || 'sit-Migration-Ledger',
  MIGRATION_INVOICE: process.env?.MIGRATION_INVOICE || 'sit-Migration-Invoice',
  MIGRATION_CUSTOMER: process.env?.MIGRATION_CUSTOMER || 'sit-Migration-Customer',
  INVOICE_STATUS: process.env?.INVOICE_STATUS || 'sit-Invoice-Status',
  CUSTOMER_STATUS: process.env?.CUSTOMER_STATUS || 'sit-Customer-Status',
  ROLLBACK_MIGRATION_LEDGER: process.env?.ROLLBACK_MIGRATION_LEDGER || 'sit-Rollback-Migration-Ledger',
  ROLLBACK_MIGRATION_INVOICE: process.env?.ROLLBACK_MIGRATION_INVOICE || 'sit-Rollback-Migration-Invoice',
  ROLLBACK_INVOICE_STATUS: process.env?.ROLLBACK_INVOICE_STATUS || 'sit-Rollback-Invoice-Status'
});

/**
 * variable to determine which table(s) to query data
 */
module.exports.FLOW = Object.freeze({
  MIGRATION: 'migration',
  ROLLBACK: 'rollback'
});

/**
 * dynamo db table status fields used for calculating migration/rollback status
 */
module.exports.STATUSES = Object.freeze({
  MIGRATION: [
    'customers_migration_status',
    'invoices_migration_status',
    'parse_ledger_migration_log_status',
    'payment_config_status',
    'reminder_business_preference_status'
  ],
  ROLLBACK: [
    'invoices_rollback_status',
    'parse_ledger_migration_log_status',
    'reminder_business_preference_status'
  ],
  CALLBACK_NOTIFIED: 'callback_notified',
  SKIP_LEDGER_MIGRATION: 'skip_ledger_migration',
  SKIP_LEDGER_ROLLBACK: 'skip_ledger_rollback'
});

/**
 * stats handler configuration
 */
module.exports.STATS_CONFIG = Object.freeze({
  LEDGER_ID_FIELD: 'migrated_business_id',
  OBJECT_FIELDS: ['failed', 'notSkipped', 'notNotified'],
  FIELDS: {
    MIGRATION: ['migrated', 'failed', 'skipped', 'notSkipped'],
    ROLLBACK: ['rollbacked', 'failed', 'skipped', 'notSkipped'],
    CALLBACK_NOTIFIED: ['notified', 'notNotified']
  }
});
