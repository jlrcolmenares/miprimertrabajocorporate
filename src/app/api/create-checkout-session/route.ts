import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Only initialize Stripe if the API key is available
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-01-28.clover",
    })
  : null;

export async function POST(req: NextRequest) {
  // Stripe is currently disabled - payments are handled manually
  if (!stripe) {
    return NextResponse.json(
      { error: "Los pagos en línea están temporalmente deshabilitados. Por favor, contacta por email para acceder al curso." },
      { status: 503 }
    );
  }

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
              images: [],
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
  } catch (error: unknown) {
    const stripeError = error as { message?: string };
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: stripeError.message || "Error al crear la sesión de pago" },
      { status: 500 }
    );
  }
}
