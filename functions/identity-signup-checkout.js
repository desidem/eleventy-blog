const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./utils/fauna');

exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);


  const customer = await stripe.customers.create({ id: user.id });
//const customer = await stripe.customers.create({ email: user.email });
  // subscribe the new customer to the free plan
  await stripe.subscriptions.create({
    customer: customer.id,
    
  });
  // create a new customer in Stripe 
  //const customer = await stripe.customers.create({ email: user.email });

  // subscribe the new customer to the free plan

 // stripe.checkout.sessions.create

 /**const customer = await stripe.subscriptions.create({ customer: customer.id}); **/

/**  const customer = await stripe.customers.create({ email: user.email }); **/
  // create a new customer in Stripe
//  const customer = await stripe.customers.create({ email: user.email });
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
        netlifyID: user.id,
        stripeID: customer.id,
      /** 
      netlifyID: user.id,
  /**    stripeID: subscription.customer, **/
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

