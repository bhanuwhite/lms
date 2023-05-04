'use strict'
// // path: ./src/api/order/routes/custom-order.js

// module.exports = {
//     routes: [
//       {
//         method: 'POST',
//         path: '/create/order',
//         handler: 'custom.exampleAction',
//       },
//     ],
//   };

//   module.exports = {
//     routes: [
//       {
//         method: 'POST',
//         path: '/payment/verify',
//         handler: 'custom.exampleActions',
//       },
//     ],
//   };



  // path: ./src/api/user-transaction/routes/custom.js

// module.exports = {
//   routes: [
//     {
//       method: 'GET',
//       path: '/create/order',
//       handler: 'custom.pre', 
//     },
//     {
//       method: 'GET',
//       path: '/payment/verify',
//       handler: 'custom.post', 
//     },
//   ],
// };



module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/orders/pretransaction',
      handler: 'custom.pre', 
    },
    {
      method: 'POST',
      path: '/orders/posttransaction',
      handler: 'custom.post', 
    },
  ],
};