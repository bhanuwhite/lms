module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/payment/verify',
        handler: 'verify.paid',
      },
    ],
  };