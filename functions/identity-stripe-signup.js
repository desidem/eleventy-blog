const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./utils/fauna');

exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);

  const stripeEvent = stripe.webhooks.constructEvent(
    body,
    headers['stripe-signature'],
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  // bail if this is not a subscription update event
  /**  if (stripeEvent.type !== 'customer.subscription.updated') return; **/
//** MODIFIED TO INCLUDE CANCEL EVENT */
 /**  if (stripeEvent.type !== 'customer.subscription.updated'|| stripeEvent.type !== 'customer.subscription.deleted') return; **/

 if (stripeEvent.type !== 'customer.subscription.created') return;

 /** const subscription = stripeEvent.data.object; **/


/** 
 
exports.handler = async ({ body, headers }, context) => {
  try {
    // make sure this event was sent legitimately.
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    // bail if this is not a subscription update event
    /**  if (stripeEvent.type !== 'customer.subscription.updated') return; **/
 //** MODIFIED TO INCLUDE CANCEL EVENT */
   /**  if (stripeEvent.type !== 'customer.subscription.updated'|| stripeEvent.type !== 'customer.subscription.deleted') return; **/
/** 
   if (stripeEvent.type !== 'customer.subscription.updated') return;

   const subscription = stripeEvent.data.object;
**/



/** 
  // create a new customer in Stripe
  const customer = await stripe.customers.create({ id: user.id });
//const customer = await stripe.customers.create({ email: user.email });
  // subscribe the new customer to the free plan
  await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: process.env.STRIPE_DEFAULT_PRICE_PLAN }],
  });
**/
  // store the Netlify and Stripe IDs in Fauna
  await faunaFetch({
    query: `
      mutation ($netlifyID: ID!, $stripeID: ID!) {
        createUser(data: { netlifyID: $netlifyID, stripeID: $stripeID }) {
          netlifyID
          stripeID
        }
      }
    `,
    variables: {
      netlifyID: user.id,
      stripeID: customer.id,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ['temp'],
      },
    }),
  };
};

console.log("hiya"); 