'use strict';

/**
 * user-comm service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-comm.user-comm');
