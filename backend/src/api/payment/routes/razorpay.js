module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/create/orderId',
        handler: 'razorpay.order',
      },
    ],
  };