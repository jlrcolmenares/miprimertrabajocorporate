// Stripe configuration
import Stripe from "stripe";

// Initialize Stripe only if the secret key is available
// Stripe is currently disabled - payments are handled manually via email
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-09-30.clover",
      typescript: true,
    })
  : null;

// Course price configuration
export const COURSE_PRICE = parseInt(process.env.NEXT_PUBLIC_COURSE_PRICE || "9900"); // in cents (€99.00)
export const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY || "EUR";
