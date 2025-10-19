import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { getUserByEmail } from "@/lib/firestore-users";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: 5 login attempts per 15 minutes per IP
    const ip = getClientIp(req);
    const rateLimitResult = rateLimit(`login:${ip}`, {
      interval: 15 * 60 * 1000, // 15 minutes
      maxRequests: 5,
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: "Demasiados intentos de inicio de sesión. Por favor, intenta de nuevo más tarde.",
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
        },
        { 
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)),
          },
        }
      );
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    // Get user by email to verify they exist
    const userDoc = await getUserByEmail(email);

    if (!userDoc) {
      return NextResponse.json(
        { error: "Email o contraseña incorrectos" },
        { status: 401 }
      );
    }

    // Note: We can't verify password directly with Admin SDK
    // The client will handle authentication with Firebase Auth
    // This endpoint is mainly for getting user data after client auth
    
    // Create custom token for the user
    const customToken = await adminAuth.createCustomToken(userDoc.uid);

    return NextResponse.json({
      message: "Inicio de sesión exitoso",
      user: {
        uid: userDoc.uid,
        email: userDoc.email,
        name: userDoc.name,
        hasPaid: userDoc.hasPaid,
      },
      token: customToken,
    });
  } catch (error: any) {
    console.error("Error logging in:", error);
    
    if (error.code === "auth/user-not-found") {
      return NextResponse.json(
        { error: "Email o contraseña incorrectos" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Error al iniciar sesión" },
      { status: 500 }
    );
  }
}
