const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./utils/fauna');

/** 
exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);
**/

  exports.handler = async ({ body, headers }, context) => {
    try {

      const { user } = JSON.parse(event.body);
      // make sure this event was sent legitimately.
      const stripeEvent = stripe.webhooks.constructEvent(
        body,
        headers['stripe-signature'],
        process.env.STRIPE_CHECKOUT_WEBHOOK_SECRET,
      );
  
      if (stripeEvent.type !== 'checkout.session.completed') return;
      
      const customer = stripeEvent.data.object;

/** 
  const customer = await stripe.checkout.sessions.completed({
     customer: customer.data.customer,
     return_url: process.env.URL, 
  });
  **/

/** 
  const customer = await stripe.customers.create({ id: user.id });
//const customer = await stripe.customers.create({ email: user.email });
  // subscribe the new customer to the free plan
  await stripe.subscriptions.create({
    customer: customer.id,
    
  }); **/
  // create a new customer in Stripe 
  //const customer = await stripe.customers.create({ email: user.email });

  // subscribe the new customer to the free plan

 // stripe.checkout.sessions.create

 /**const customer = await stripe.subscriptions.create({ customer: customer.id}); **/


  // store the Netlify and Stripe IDs in Fauna
  await faunaFetch({
    query: `
      mutation ($netlifyID: ID!, $stripeID: ID!) {
        createUser(data: { netlifyID: $netlifyID, stripeID: $stripeID }) {
          netlifyID
          stripeID
        }
      }
    `
     ,
     variables: {
     /*   netlifyID, **/
        stripeID: customer,
      /** 
      netlifyID: user.id,
  /**    stripeID: subscription.customer, **/
    }, 
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ['temp'], //MIGHT LOSE THIS
      },
    }),
 
}
} catch (err) {
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }
};

console.log("hiyo"); 