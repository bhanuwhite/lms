'use strict';

/**
 * user-has-course service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-has-course.user-has-course');
