import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin") || "http://localhost:3000";

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: process.env.NEXT_PUBLIC_CURRENCY?.toLowerCase() || "eur",
            product_data: {
              name: "Mi Primer Trabajo Corporate - Curso Completo",
              description: "Acceso completo y permanente al curso",
              images: [], // You can add course image URLs here
            },
            unit_amount: parseInt(process.env.NEXT_PUBLIC_COURSE_PRICE || "9900"),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/curso`,
      metadata: {
        course: "miprimertrabajocorporate",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
