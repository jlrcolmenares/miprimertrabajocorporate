import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { isAdminEmail } from "@/lib/admin-config";

/**
 * Validate if the authenticated user is an admin
 * This runs on the server side where environment variables are accessible
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
    
    // Check if user is admin using server-side environment variables
    if (decodedToken.email && isAdminEmail(decodedToken.email)) {
      return NextResponse.json({
        message: "Admin validated successfully",
        email: decodedToken.email,
      });
    } else {
      return NextResponse.json(
        { error: "No tienes permisos de administrador" },
        { status: 403 }
      );
    }
  } catch (error: any) {
    console.error("Error validating admin:", error);
    
    if (error.code === "auth/id-token-expired") {
      return NextResponse.json(
        { error: "Sesión expirada" },
        { status: 401 }
      );
    }

    if (error.code === "auth/argument-error") {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Error al validar administrador" },
      { status: 500 }
    );
  }
}
