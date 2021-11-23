/** THIS SIGNUP CREATES SHOUDL CREATE IDS for STRIPE AND NETLIFY at CHECKOUT **/
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./utils/fauna');

exports.handler = async ({ body, headers }, context) => {
  try {
    // make sure this event was sent legitimately.
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_CREATE_WEBHOOK_SECRET,
    );

    if (stripeEvent.type !== 'customer.subscription.created') return;
    
    const customer = stripeEvent.data.customer;


  // create a new customer in Stripe
 // const customer = await stripe.invoice.created;
//const customer = await stripe.customers.create({ email: user.email });
//const customer = await stripe.customers.create({ id: user.id });
  // subscribe the new customer to the free plan

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
      netlifyID,
      stripeID: customer,

     /** netlifyID: user.id,
      stripeID: customer.id, **/
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

} catch (err) {
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }
};

console.log("hiyo"); 

