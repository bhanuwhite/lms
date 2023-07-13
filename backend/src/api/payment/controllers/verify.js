const Razorpay = require('razorpay');
var crypto = require("crypto");

// const con = require('./razorpay')
const { createCoreController } = require("@strapi/strapi").factories;



module.exports = createCoreController("api::payment.payment", ({ strapi }) => ({
  // Method 1: Creating an entirely custom action
  async paid(ctx) {

    let body = ctx.request.body.razorpay_order_id + "|" + ctx.request.body.razorpay_payment_id;

    var expectedSignature = crypto.createHmac('sha256', process.env.YOUR_KEY_ID)
                                  .update(body.toString())
                                  .digest("hex");
                                  console.log("sig received ", ctx.request.body.razorpay_signature);
                                  console.log("sig generated ", expectedSignature);
    var response = { signatureIsValid: "false" };
    if (expectedSignature === ctx.request.body.razorpay_signature)
      response = { signatureIsValid: "true" };
          ctx.send({ response });

  }
}))    