'use strict';

/**
 * user-transaction service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-transaction.user-transaction');
