'use strict';

/**
 * content-library service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::content-library.content-library');
