import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { createUserDocument, getUserByUid } from "@/lib/firestore-users";

/**
 * Sync Firebase Auth user to Firestore
 * This creates a Firestore document for users that exist in Firebase Auth but not in Firestore
 */
export async function POST(req: NextRequest) {
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

    // Check if user already exists in Firestore
    const existingUser = await getUserByUid(uid);
    
    if (existingUser) {
      return NextResponse.json({
        message: "User already synced",
        user: existingUser,
      });
    }

    // Get user from Firebase Auth
    const authUser = await adminAuth.getUser(uid);

    // Create user in Firestore with hasPaid = false (default for new users)
    const newUser = await createUserDocument(
      authUser.uid,
      authUser.email || "",
      authUser.displayName || authUser.email?.split("@")[0] || "Usuario",
      false // hasPaid - new users haven't paid yet
    );

    return NextResponse.json({
      message: "User synced successfully",
      user: newUser,
    });
  } catch (error: any) {
    console.error("Error syncing user:", error);
    
    return NextResponse.json(
      { error: "Error al sincronizar usuario" },
      { status: 500 }
    );
  }
}
