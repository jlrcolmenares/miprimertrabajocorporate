import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { getUserByUid } from "@/lib/firestore-users";

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

    // Get user data from Firestore
    const user = await getUserByUid(uid);

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        uid: user.uid,
        email: user.email,
        name: user.name,
        hasPaid: user.hasPaid,
      },
    });
  } catch (error: any) {
    console.error("Error getting user:", error);
    
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
      { error: "Error al obtener usuario" },
      { status: 500 }
    );
  }
}
