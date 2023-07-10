const Razorpay = require('razorpay');

const { createCoreController } = require("@strapi/strapi").factories;

var instance = new Razorpay({
    key_id: process.env.YOUR_KEY_ID,
    key_secret: process.env.YOUR_KEY_SECRET,
  });

module.exports = createCoreController("api::payment.payment", ({ strapi }) => ({
  // Method 1: Creating an entirely custom action
  async order(ctx) {
      console.log("create orderId request", ctx.request.body);
      var options = {
        amount: ctx.request.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "rcp1"
      };
      let a = await instance.orders.create(options);
      console.log(a);
      ctx.send({ orderId : a.id })
  } 
}))  