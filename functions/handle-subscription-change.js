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

/** 
 * 
 * 
exports.handler = async ({ body, headers }, context) => {
  try {
    // make sure this event was sent legitimately.
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_CHANGE_WEBHOOK_SECRET,
    );

    // bail if this is not a subscription update event
    /**  if (stripeEvent.type !== 'customer.subscription.updated') return; **/
 //** MODIFIED TO INCLUDE CANCEL EVENT */
   /**  if (stripeEvent.type !== 'customer.subscription.updated'|| stripeEvent.type !== 'customer.subscription.deleted') return; **/

    if (stripeEvent.type !== 'customer.subscription.updated') return;

    const subscription = stripeEvent.data.object;
    const { user } = context.clientContext;
    const result = await faunaFetch({
      
      query: `
      mutation ($netlifyID: ID!, $stripeID: ID!) {
        createUser(data: { netlifyID: $netlifyID, stripeID: $stripeID }) {
          netlifyID
          stripeID
        }
      }
    `,
  /**  query:  `
          query ($stripeID: ID!) {
            getUserByStripeID(stripeID: $stripeID) {
              netlifyID
            }
          }
        `,  **/
      variables: {
        netlifyID: user.sub,
        stripeID: subscription.customer,
      },
    });

    const { netlifyID } = result.data.getUserByStripeID;
// trying to create Netlify role based on Stripe cancel or other status if (subscription.status !== 'active') role = 'remove'//
   /**  if (subscription.status !== 'active') return {
      body: JSON.stringify({
        app_metadata: {
          roles: ['none'],
        },
      }),
    };  
    
     if (subscription.items.data[0].status !== 'active') {
      const role = 'cancel'; 
    };
**/

/** /*I THOUGHT THIS WOUL WORK */ /** 
if (subscription.status !== 'active') {
  const role = 'cancel'; 
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

};
**/
/** 
 
if (subscription.items.data[0].status !== 'active') await fetch(
  `${identity.url}/admin/users/${netlifyID}`, {
  method: 'PUT',
  headers: {

    Authorization: `Bearer ${identity.token}`,
  },
  body: JSON.stringify({
    app_metadata: {
      roles: ['cancel'],
    },
  }),
});
**/
    // take the first word of the plan name and use it as the role--was called nickname in UI
const plan = subscription.items.data[0].plan.nickname;
const role = plan.split(' ')[0].toLowerCase(); 

/**ATTEMPT AT NAMING ROLE AFTER STATUS not sure of format*//*
const role = subscription.items.data[0].status; */



/** 
return {
  statusCode: 200,
  body: JSON.stringify({ received: true }),
};
**/ 

/** 
if (stripeEvent.type == 'customer.subscription.deleted') {
   const role = "cancel"; 
} else {
 
    // take the first word of the plan name and use it as the role--was called nickname in UI
    const plan = subscription.items.data[0].plan.nickname;
    const role = plan.split(' ')[0].toLowerCase(); 
 /**    const role = subscription.items.plan.status; **/
   /** 
}; /**wrapped end of else **/

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