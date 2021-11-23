const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./utils/fauna');

exports.handler = async (_event, context) => {
  const { user } = context.clientContext;

exports.handler = async ({ body, headers }, context) => {
    try {
      // make sure this event was sent legitimately.
      const stripeEvent = stripe.webhooks.constructEvent(
        body,
        headers['stripe-signature'],
        process.env.STRIPE_CHECKOUT_WEBHOOK_SECRET,
      );
    
      if (stripeEvent.type !== 'checkout.session.completed') return;


  const checkout = stripeEvent.data.object;

  const customer = checkout.customer;


  




  // create a new customer in Stripe
//  const customer = await stripe.customers.create({ id: user.id }); //
//const customer = await stripe.customers.create({ email: user.email });
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
      netlifyID: user.id, //or other? Where to get the id from
      stripeID: checkout.customer,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ['free'],
      },
    }),
  };
} catch (err) {
  return {
    statusCode: 400,
    body: 'Webhook Error: $(err.message}',
  };
}


};

console.log("hiya"); 