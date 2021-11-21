const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
/**const express = require('express');
const app = express();
app.use(express.static('public')); **/



exports.handler = async (event) => {
const priceId = '{ price_1JtNOFACG3Zsu2XFU4il0Ki3 }'; 
//const YOUR_DOMAIN = 'http://yeuxandi.com';

/** app.post('/create-checkout-session', async (req, res) => { **/
  /** exports.handler = async (event) => { **/
const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
   /** customer_email: 'customer@example.com',
    billing_address_collection: 'auto', **/

   /**  shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    }, **/

    line_items: [
      {
        // Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
        price: priceId,
        quantity: 1,
      },
    ],
  /**   mode: 'payment', **/
    success_url: `{process.env.URL}/success.html`,
    cancel_url: process.env.URL, 
  });
};
  res.redirect(303, session.url);

/** 
app.listen(4242, () => console.log('Running on port 4242')); **/

console.log("hiya"); 



