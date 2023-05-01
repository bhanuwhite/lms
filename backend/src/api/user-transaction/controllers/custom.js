'use strict'

const express = require("express");
const app = express();
// const port = 8080;
// const bodyParser = require("body-parser");
const Razorpay = require("razorpay");
const { request } = require("http");
// app.use(require("body-parser").json());
// app.get("/", (req, res) => {
//   res.sendFile("standard.html", { root: __dirname });
// });
// app.post("/create/orderId", (ctx) => {
// });
// app.post("/api/payment/verify", (req, res) => {
// });
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });


const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::user-transaction.user-transaction', ({ strapi }) =>  ({
  // Method 1: Creating an entirely custom action
  async exampleAction(ctx) {
    console.log("create orderId request", ctx.request.body);
  var options = {
    amount: ctx.request.body.amount, // amount in the smallest currency unit
    currency: "INR",
    receipt: "rcp1",
  };
  instance.orders.create(options, function (err, order) {
    console.log(order);
    ctx.send({ orderId: order.id });
  });
  },
}));


module.exports = createCoreController('api::user-transaction.user-transaction', ({ strapi }) =>  ({
  async exampleActions(ctx) {
    let body = ctx.request.body.response.razorpay_order_id + "|" + ctx.request.body.response.razorpay_payment_id;

  var crypto = require("crypto");
  var expectedSignature = crypto.createHmac('sha256', 'key_secret')
                                .update(body.toString())
                                .digest("hex");
                                console.log("sig received ", ctx.request.body.response.razorpay_signature);
                                console.log("sig generated ", expectedSignature);
  var response = { signatureIsValid: "false" };
  if (expectedSignature === ctx.request.body.response.razorpay_signature)
    response = { signatureIsValid: "true" };
        ctx.send(response);
  },
}));