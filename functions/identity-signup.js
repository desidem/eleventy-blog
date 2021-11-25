/** THIS SIGNUP CREATES SHOUDL CREATE IDS for STRIPE AND NETLIFY at CHECKOUT **/
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./utils/fauna');

exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);

  const customer = await stripe.customers.create({ email: user.email });
  // create a new customer in Stripe
  //const customer = await stripe.invoice.created;//
//const customer = await stripe.customers.create({ email: user.email });
//const customer = await stripe.customers.create({ id: user.id });
  // subscribe the new customer to the free plan
await stripe.subscriptions.create({
    customer: customer.id,
    items: [{metadata: {order_id: '1'}}],
   /**  items: [{price: process.env.STRIPE_DEFAULT_PRICE_PLAN}],**/

})
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

console.log("hiyo"); 

