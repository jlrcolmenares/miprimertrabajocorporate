import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { getUserByUid, updateUserProfile } from "@/lib/firestore-users";

export async function POST(req: NextRequest) {
  try {
    const { uid, name, email, currentPassword, newPassword } = await req.json();

    if (!uid) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    const user = await getUserByUid(uid);
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Update Firebase Authentication user
    const authUpdates: any = {};
    
    if (name && name !== user.name) {
      authUpdates.displayName = name;
    }

    if (email && email !== user.email) {
      authUpdates.email = email.toLowerCase();
    }

    // Handle password change
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: "La nueva contraseña debe tener al menos 6 caracteres" },
          { status: 400 }
        );
      }

      authUpdates.password = newPassword;
    }

    // Update Firebase Auth if there are changes
    if (Object.keys(authUpdates).length > 0) {
      await adminAuth.updateUser(uid, authUpdates);
    }

    // Update Firestore document
    if (name || email) {
      await updateUserProfile(uid, name, email);
    }

    // Get updated user data
    const updatedUser = await getUserByUid(uid);

    return NextResponse.json({
      message: "Perfil actualizado exitosamente",
      user: {
        uid: updatedUser!.uid,
        email: updatedUser!.email,
        name: updatedUser!.name,
        hasPaid: updatedUser!.hasPaid,
      },
    });
  } catch (error: any) {
    console.error("Error updating profile:", error);
    
    if (error.code === "auth/email-already-exists") {
      return NextResponse.json(
        { error: "Este email ya está en uso" },
        { status: 400 }
      );
    }

    if (error.code === "auth/invalid-email") {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error al actualizar perfil" },
      { status: 500 }
    );
  }
}
