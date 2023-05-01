'use strict'
// path: ./src/api/order/routes/custom-order.js

module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/create/order',
        handler: 'custom.exampleAction',
      },
    ],
  };

  module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/payment/verify',
        handler: 'custom.exampleActions',
      },
    ],
  };