import { NextRequest, NextResponse } from "next/server";
import { stripe, COURSE_PRICE, CURRENCY } from "@/lib/stripe";
import { adminAuth } from "@/lib/firebase-admin";
import { getUserByUid } from "@/lib/firestore-users";

export async function POST(req: NextRequest) {
  // Stripe is currently disabled - payments are handled manually via email
  if (!stripe) {
    return NextResponse.json(
      { error: "Los pagos en línea están temporalmente deshabilitados. Por favor, contacta por email para acceder al curso." },
      { status: 503 }
    );
  }

  try {
    const authHeader = req.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1];

    // Verify the ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Get user data
    const user = await getUserByUid(uid);

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Check if user already paid
    if (user.hasPaid) {
      return NextResponse.json(
        { error: "Ya has comprado el curso" },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: CURRENCY.toLowerCase(),
            product_data: {
              name: "Mi Primer Trabajo Corporate - Curso Completo",
              description: "Acceso completo al curso de preparación para el mundo corporativo",
            },
            unit_amount: COURSE_PRICE,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?payment=cancelled`,
      customer_email: user.email,
      client_reference_id: uid, // Store user ID for webhook
      metadata: {
        userId: uid,
        userEmail: user.email,
        userName: user.name,
      },
      // Enable automatic email receipts from Stripe
      payment_intent_data: {
        receipt_email: user.email,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    
    return NextResponse.json(
      { error: "Error al crear sesión de pago" },
      { status: 500 }
    );
  }
}
