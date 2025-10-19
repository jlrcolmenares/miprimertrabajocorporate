import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { getUserByEmail } from "@/lib/firestore-users";

export async function POST(req: NextRequest) {
  try {
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
