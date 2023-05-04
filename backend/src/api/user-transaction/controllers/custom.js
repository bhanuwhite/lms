// 'use strict'

// const express = require("express");
// const app = express();
// // const port = 8080;
// // const bodyParser = require("body-parser");
// const Razorpay = require("razorpay");
// const { request } = require("http");
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


// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::user-transaction.user-transaction', ({ strapi }) =>  ({
//   // Method 1: Creating an entirely custom action
//   async exampleAction(ctx) {
//     console.log("create orderId request", ctx.request.body);
//   var options = {
//     amount: ctx.request.body.amount, // amount in the smallest currency unit
//     currency: "INR",
//     receipt: "rcp1",
//   };
//   instance.orders.create(options, function (err, order) {
//     console.log(order);
//     ctx.send({ orderId: order.id });
//   });
//   },
// }));


// module.exports = createCoreController('api::user-transaction.user-transaction', ({ strapi }) =>  ({
//   async exampleActions(ctx) {
//     let body = ctx.request.body.response.razorpay_order_id + "|" + ctx.request.body.response.razorpay_payment_id;

//   var crypto = require("crypto");
//   var expectedSignature = crypto.createHmac('sha256', 'key_secret')
//                                 .update(body.toString())
//                                 .digest("hex");
//                                 console.log("sig received ", ctx.request.body.response.razorpay_signature);
//                                 console.log("sig generated ", expectedSignature);
//   var response = { signatureIsValid: "false" };
//   if (expectedSignature === ctx.request.body.response.razorpay_signature)
//     response = { signatureIsValid: "true" };
//         ctx.send(response);
//   },
// }));




// path: ./src/api/restaurant/controllers/restaurant.js

// const { createCoreController } = require('@strapi/strapi').factories;
// const https = require('https');
// const PaytmChecksum = require('paytmchecksum');

// module.exports = createCoreController('api::user-transaction.user-transaction', ({ strapi }) => ({
//     // Method 1: Creating an entirely custom action
//     async pre(ctx) {
//         /*
//         * import checksum generation utility
//         * You can get this utility from https://developer.paytm.com/docs/checksum/
//         */

//         var paytmParams = {};
//         let params = JSON.parse(ctx.request.body)
//         params.orderId = params.orderId
//         console.log(params)
//         const entry = await strapi.entityService.create('api::user-transaction.user-transaction', {
//             data: {
//                 email: params.email,
//                 orderId: params.orderId,
//                 paymentInfo: null,
//                 course: params.cart,
//                 transactionId: null,
//                 amount: params.amount,
//                 status: 'pending',
//             },
//         });

//         paytmParams.body = {
//             "requestType": "Payment",
//             "OBJID": entry.id,
//             "mid": process.env.MID,
//             "websiteName": "YOUR_WEBSITE_NAME",
//             "orderId": params.orderId,
//             "callbackUrl": "http://localhost:1337/api/payment/verify",
//             "txnAmount": {
//                 "value": params.amount,
//                 "currency": "INR",
//             },
//             "userInfo": {
//                 "custId": "CUST_001",
//             },
//         };

//         /*
//         * Generate checksum by parameters we have in body
//         * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
//         */
//         let checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.MKEY)
//         paytmParams.head = {
//             "signature": checksum
//         };

//         var post_data = JSON.stringify(paytmParams);

//         const gettoken = async () => {
//             return new Promise((resolve, reject) => {
//                 var options = {
//                     hostname: 'securegw.paytm.in',

//                     port: 443,
//                     path: `/theia/api/v1/initiateTransaction?mid=${process.env.MID}&orderId=${params.orderId}`,
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Content-Length': post_data.length
//                     }
//                 };

//                 var response = "";
//                 var post_req = https.request(options, function (post_res) {
//                     post_res.on('data', function (chunk) {
//                         response += chunk;
//                     });

//                     post_res.on('end', function () {
//                         console.log('Response: ', response);
//                         resolve(response)
//                     });
//                 });

//                 post_req.write(post_data);
//                 post_req.end();
//             })
//         }
//         let myr = await gettoken()
//         ctx.send(JSON.parse(myr))
//     },

//     async post(ctx) {
//         /*
//         * import checksum generation utility
//         * You can get this utility from https://developer.paytm.com/docs/checksum/
//         */ 
       
//         let params = ctx.request.body  
//         const entries = await strapi.entityService.findMany('api::user-transaction.user-transaction', {

//             fields: ['id'],
//             filters: { orderId: params.orderId },
//         }); 
//         let id = entries[0].id
//         await strapi.entityService.update('api::user-transaction.user-transaction', id, {
//             data: {
//                 transactionId: params.TXNID,
//                 paymentInfo: params,
//                 status: params.STATUS
//             },
//         });
//         ctx.redirect("http://localhost:3000/success") 
//     },

// }));















// console.log("create orderId request", ctx.request.body);
//   var options = {
//     amount: ctx.request.body.amount, // amount in the smallest currency unit
//     currency: "INR",
//     receipt: "rcp1",
//   };
//   instance.orders.create(options, function (err, order) {
//     console.log(order);
//     ctx.send({ orderId: order.id });
//   });

//   let body = ctx.request.body.response.razorpay_order_id + "|" + ctx.request.body.response.razorpay_payment_id;

//   var crypto = require("crypto");
//   var expectedSignature = crypto.createHmac('sha256', 'key_secret')
//                                 .update(body.toString())
//                                 .digest("hex");
//                                 console.log("sig received ", ctx.request.body.response.razorpay_signature);
//                                 console.log("sig generated ", expectedSignature);
//   var response = { signatureIsValid: "false" };
//   if (expectedSignature === ctx.request.body.response.razorpay_signature)
//     response = { signatureIsValid: "true" };
//         ctx.send(response);


















// path: ./src/api/restaurant/controllers/restaurant.js

const { createCoreController } = require('@strapi/strapi').factories;
const https = require('https');
const PaytmChecksum = require('paytmchecksum');

module.exports = createCoreController('api::user-transaction.user-transaction', ({ strapi }) => ({
    // Method 1: Creating an entirely custom action
    async pre(ctx) {
        /*
        * import checksum generation utility
        * You can get this utility from https://developer.paytm.com/docs/checksum/
        */

        var paytmParams = {};
        let params = JSON.parse(ctx.request.body)
        params.orderId = params.orderId
        console.log(params)
        const entry = await strapi.entityService.create('api::user-transaction.user-transaction', {
            data: {
                email: params.email,
                orderId: params.orderId,
                paymentInfo: null,
                products: params.cart,
                transactionId: null,
                amount: params.amount,
                status: 'pending',
            },
        });

        paytmParams.body = {
            "requestType": "Payment",
            "OBJID": entry.id,
            "mid": process.env.MID,
            "websiteName": "YOUR_WEBSITE_NAME",
            "orderId": params.orderId,
            "callbackUrl": "http://localhost:1337/api/orders/posttransaction",
            "txnAmount": {
                "value": params.amount,
                "currency": "INR",
            },
            "userInfo": {
                "custId": "CUST_001",
            },
        };

        /*
        * Generate checksum by parameters we have in body
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
        */
        let checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.MKEY)
        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);

        const gettoken = async () => {
            return new Promise((resolve, reject) => {
                var options = {

                    /* for Staging */
                    // hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    hostname: 'securegw.paytm.in',

                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.MID}&orderId=${params.orderId}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        console.log('Response: ', response);
                        resolve(response)
                    });
                });

                post_req.write(post_data);
                post_req.end();
            })

        }

        let myr = await gettoken()
        ctx.send(JSON.parse(myr))


    },

    async post(ctx) {
        /*
        * import checksum generation utility
        * You can get this utility from https://developer.paytm.com/docs/checksum/
        */ 
       
        let params = ctx.request.body  
        const entries = await strapi.entityService.findMany('api::user-transaction.user-transaction', {

            fields: ['id'],
            filters: { orderId: params.orderId },
        }); 
        let id = entries[0].id
        await strapi.entityService.update('api::user-transaction.user-transaction', id, {
            data: {
                transactionId: params.TXNID,
                paymentInfo: params,
                status: params.STATUS
            },
        });
        ctx.redirect("http://localhost:3000/success") 
    },

}));
