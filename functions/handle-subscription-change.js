const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fetch = require('isomorphic-fetch');
const { faunaFetch } = require('./utils/fauna');


exports.handler = async ({ body, headers }, context) => {
  try {
    // make sure this event was sent legitimately.
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_CHANGE_WEBHOOK_SECRET,
    );

    if (stripeEvent.type !== 'customer.subscription.updated') return;
    const customer = stripeEvent.data;
/**    const subscription = stripeEvent.data.object;**/
/**    const { user } = context.clientContext; **/
    const result = await faunaFetch({
      
        query: `
            query ($stripeID: ID!) {
              getUserByStripeID(stripeID: $stripeID) {
                netlifyID
              }
            }
          `,
        variables: {

          stripeID: customer
        /**   stripeID: subscription.customer,*/

          /** stripeID: subscription.data.customer, */
        }, 
    });

    const { netlifyID } = result.data.getUserByStripeID;



    // take the first word of the plan name and use it as the role--was called nickname in UI
const plan = subscription.items.data[0].plan.nickname;
const role = plan.split(' ')[0].toLowerCase(); 

    // send a call to the Netlify Identity admin API to update the user role
    const { identity } = context.clientContext;
    await fetch(`${identity.url}/admin/users/${netlifyID}`, {
      method: 'PUT',
      headers: {
        // note that this is a special admin token for the Identity API
        Authorization: `Bearer ${identity.token}`,
      },
      body: JSON.stringify({
        app_metadata: {
          roles: [role],
        },
      }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  
  } catch (err) {
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }
};

console.log("olla"); 


