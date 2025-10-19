import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { markModuleAsCompleted, markModuleAsIncomplete, getUserByUid } from "@/lib/firestore-users";

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
    const { moduleId, completed } = await req.json();

    if (!moduleId) {
      return NextResponse.json(
        { error: "Module ID es requerido" },
        { status: 400 }
      );
    }

    // Verify the ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Toggle module completion
    if (completed) {
      await markModuleAsCompleted(uid, moduleId);
    } else {
      await markModuleAsIncomplete(uid, moduleId);
    }

    // Get updated user data
    const user = await getUserByUid(uid);

    return NextResponse.json({
      success: true,
      completedModules: user?.completedModules || [],
    });
  } catch (error: any) {
    console.error("Error toggling module completion:", error);
    
    return NextResponse.json(
      { error: "Error al actualizar módulo" },
      { status: 500 }
    );
  }
}
