/** was named create-manage-link **/
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./utils/fauna');

exports.handler = async (_event, context) => {
  const { user } = context.clientContext;

  const result = await faunaFetch({
    query: `
      query ($netlifyID: ID!) {
        getUserByNetlifyID(netlifyID: $netlifyID) {
          stripeID
        }
      }
    `,
    variables: {
      netlifyID: user.sub,
    },
  });
/** 
  const { stripeID } = result.data.getUserByNetlifyID;
**/





  const priceId = 'price_1JtNOFACG3Zsu2XFU4il0Ki3'; 
  
  const link = await stripe.checkout.sessions.create({
    
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],  
    
    automatic_tax: {
      enabled: true,
    }, 

    success_url: 'https://yeuxandi.com/success-manage/index',
    cancel_url: 'https://yeuxandi.com/index',

    });
  return {
    statusCode: 200,
    body: JSON.stringify(link.url),
  };
};

console.log("well?");

