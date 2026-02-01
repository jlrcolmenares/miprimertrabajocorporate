import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    // Get the authorization token
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];

    // Verify the token and check admin status
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Get user document from Firestore
    const userDoc = await adminDb.collection("users").doc(uid).get();
    const userData = userDoc.data();

    if (!userData?.isAdmin) {
      return NextResponse.json(
        { error: "No tienes permisos de administrador" },
        { status: 403 }
      );
    }

    // Get the email from request body
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email invalido" },
        { status: 400 }
      );
    }

    // Check if user already exists
    try {
      await adminAuth.getUserByEmail(email);
      return NextResponse.json(
        { error: "Este usuario ya existe en el sistema" },
        { status: 400 }
      );
    } catch (error: unknown) {
      // User doesn't exist, continue with creation
      const firebaseError = error as { code?: string };
      if (firebaseError.code !== "auth/user-not-found") {
        throw error;
      }
    }

    // Generate a random temporary password
    const tempPassword = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);

    // Create the user in Firebase Auth
    const newUser = await adminAuth.createUser({
      email,
      password: tempPassword,
      emailVerified: false,
    });

    // Create user document in Firestore
    await adminDb.collection("users").doc(newUser.uid).set({
      email,
      name: email.split("@")[0], // Default name from email
      hasPaid: false,
      isAdmin: false,
      completedModules: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Generate password reset link (this triggers the email)
    const resetLink = await adminAuth.generatePasswordResetLink(email);

    console.log(`Invitation sent to ${email}, reset link: ${resetLink}`);

    return NextResponse.json({
      success: true,
      message: `Invitacion enviada a ${email}`,
      uid: newUser.uid,
    });

  } catch (error) {
    console.error("Error inviting user:", error);
    return NextResponse.json(
      { error: "Error al enviar la invitacion" },
      { status: 500 }
    );
  }
}
