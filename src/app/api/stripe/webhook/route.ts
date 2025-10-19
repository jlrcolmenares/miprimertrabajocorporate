import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { markUserAsPaid } from "@/lib/firestore-users";
import Stripe from "stripe";

// Disable body parsing, need raw body for webhook signature verification
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No signature" },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is not set");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        console.log("Payment successful for session:", session.id);
        console.log("Session metadata:", session.metadata);
        console.log("Client reference ID:", session.client_reference_id);
        console.log("Customer:", session.customer);
        
        // Get user ID from metadata or client_reference_id
        const userId = session.metadata?.userId || session.client_reference_id;
        
        if (!userId) {
          console.error("No user ID in session metadata or client_reference_id");
          console.error("Full session object:", JSON.stringify(session, null, 2));
          return NextResponse.json(
            { error: "No user ID found" },
            { status: 400 }
          );
        }

        console.log(`Updating Firestore for user: ${userId}`);

        // Update user in Firestore
        await markUserAsPaid(
          userId,
          session.customer as string,
          session.id
        );

        console.log(`✅ User ${userId} marked as paid successfully`);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("PaymentIntent succeeded:", paymentIntent.id);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("PaymentIntent failed:", paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
