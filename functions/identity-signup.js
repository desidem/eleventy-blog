const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./utils/fauna');
const fetch = require('isomorphic-fetch');

exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);
    


  // create a new customer in Stripe
//  const customer = await stripe.customers.create({ id: user.id }); //
//const customer = await stripe.customers.create({ email: user.email });
  // subscribe the new customer to the free plan

  // store the Netlify and Stripe IDs in Fauna
  await faunaFetch({
    query: `
      mutation ($netlifyID: ID!, $stripeID: ID!) {
        createUser(data: { netlifyID: $netlifyID }) {
          netlifyID
        }
      }
    `,
    variables: {
      netlifyID: user, //or other? Where to get the id from
     
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

};

console.log("hiya"); 

