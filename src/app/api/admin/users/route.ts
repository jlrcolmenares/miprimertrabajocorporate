import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { FirestoreUser, markUserAsPaid, updateUserDocument } from "@/lib/firestore-users";
import { isAdminEmail } from "@/lib/admin-config";

async function isAdmin(req: NextRequest): Promise<boolean> {
  try {
    const authHeader = req.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return false;
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    // Check if user is admin using the admin config
    return decodedToken.email ? isAdminEmail(decodedToken.email) : false;
  } catch (error) {
    return false;
  }
}

// GET - List all users
export async function GET(req: NextRequest) {
  try {
    // Check admin authentication
    if (!(await isAdmin(req))) {
      return NextResponse.json(
        { error: "No autorizado - Solo administradores" },
        { status: 403 }
      );
    }

    const usersSnapshot = await adminDb.collection("users").get();
    const users: FirestoreUser[] = [];

    usersSnapshot.forEach((doc) => {
      users.push({
        uid: doc.id,
        ...doc.data(),
      } as FirestoreUser);
    });

    // Sort by creation date (newest first)
    users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      users,
      total: users.length,
      paidUsers: users.filter(u => u.hasPaid).length,
    });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }
}

// POST - Update user (toggle payment status, etc.)
export async function POST(req: NextRequest) {
  try {
    // Check admin authentication
    if (!(await isAdmin(req))) {
      return NextResponse.json(
        { error: "No autorizado - Solo administradores" },
        { status: 403 }
      );
    }

    const { uid, action, ...updates } = await req.json();

    if (!uid) {
      return NextResponse.json(
        { error: "UID de usuario requerido" },
        { status: 400 }
      );
    }

    switch (action) {
      case "togglePayment":
        const currentUser = await adminDb.collection("users").doc(uid).get();
        if (!currentUser.exists) {
          return NextResponse.json(
            { error: "Usuario no encontrado" },
            { status: 404 }
          );
        }

        const userData = currentUser.data() as FirestoreUser;
        const newPaymentStatus = !userData.hasPaid;

        if (newPaymentStatus) {
          await markUserAsPaid(uid, "admin-manual", "admin-session");
        } else {
          await updateUserDocument(uid, { 
            hasPaid: false,
            stripeCustomerId: undefined,
            stripeSessionId: undefined,
          });
        }

        return NextResponse.json({
          message: `Usuario ${newPaymentStatus ? 'marcado como pagado' : 'marcado como no pagado'}`,
          hasPaid: newPaymentStatus,
        });

      case "updateProfile":
        await updateUserDocument(uid, updates);
        return NextResponse.json({
          message: "Perfil actualizado exitosamente",
        });

      default:
        return NextResponse.json(
          { error: "Acción no válida" },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Error al actualizar usuario" },
      { status: 500 }
    );
  }
}

// DELETE - Delete user
export async function DELETE(req: NextRequest) {
  try {
    // Check admin authentication
    if (!(await isAdmin(req))) {
      return NextResponse.json(
        { error: "No autorizado - Solo administradores" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json(
        { error: "UID de usuario requerido" },
        { status: 400 }
      );
    }

    // Delete from Firestore
    await adminDb.collection("users").doc(uid).delete();

    // Delete from Firebase Auth
    await adminAuth.deleteUser(uid);

    return NextResponse.json({
      message: "Usuario eliminado exitosamente",
    });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Error al eliminar usuario" },
      { status: 500 }
    );
  }
}
