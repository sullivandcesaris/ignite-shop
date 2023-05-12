import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY ?? ""; // Use an empty string as the default value if undefined

export const stripe = new Stripe(secretKey, { 
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'Ignite Shop'
  }
});
