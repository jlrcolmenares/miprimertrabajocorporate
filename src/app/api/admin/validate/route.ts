import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { checkIsAdmin } from "@/lib/admin-config";

/**
 * Validate if the authenticated user is an admin
 * Checks the isAdmin field in the user's Firestore document
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

    // Check if user is admin using Firestore
    const isAdmin = await checkIsAdmin(decodedToken.uid);

    if (isAdmin) {
      return NextResponse.json({
        isAdmin: true,
        message: "Admin validated successfully",
        email: decodedToken.email,
      });
    } else {
      return NextResponse.json(
        { error: "No tienes permisos de administrador", isAdmin: false },
        { status: 403 }
      );
    }
  } catch (error: unknown) {
    const firebaseError = error as { code?: string };
    console.error("Error validating admin:", error);

    if (firebaseError.code === "auth/id-token-expired") {
      return NextResponse.json(
        { error: "Sesion expirada" },
        { status: 401 }
      );
    }

    if (firebaseError.code === "auth/argument-error") {
      return NextResponse.json(
        { error: "Token invalido" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Error al validar administrador" },
      { status: 500 }
    );
  }
}
