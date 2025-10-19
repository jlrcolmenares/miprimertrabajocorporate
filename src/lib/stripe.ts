// Stripe configuration
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

// Initialize Stripe with secret key (server-side only)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-09-30.clover",
  typescript: true,
});

// Course price configuration
export const COURSE_PRICE = parseInt(process.env.NEXT_PUBLIC_COURSE_PRICE || "9900"); // in cents (€99.00)
export const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY || "EUR";
