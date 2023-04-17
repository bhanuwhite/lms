'use strict';

/**
 * content-library router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::content-library.content-library');
