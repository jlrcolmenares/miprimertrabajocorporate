import { NextRequest, NextResponse } from "next/server";
import { findUserById, updateUser, verifyPassword, hashPassword } from "@/lib/users";

export async function POST(req: NextRequest) {
  try {
    const { userId, name, email, currentPassword, newPassword } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    const user = findUserById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Prepare updates
    const updates: any = {};

    if (name && name !== user.name) {
      updates.name = name;
    }

    if (email && email !== user.email) {
      updates.email = email.toLowerCase();
    }

    // Handle password change
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Debes proporcionar tu contraseña actual" },
          { status: 400 }
        );
      }

      if (!verifyPassword(user, currentPassword)) {
        return NextResponse.json(
          { error: "Contraseña actual incorrecta" },
          { status: 401 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: "La nueva contraseña debe tener al menos 6 caracteres" },
          { status: 400 }
        );
      }

      updates.password = hashPassword(newPassword);
    }

    // Update user
    const updatedUser = updateUser(userId, updates);

    // Don't send password back
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      message: "Perfil actualizado exitosamente",
      user: userWithoutPassword,
    });
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Error al actualizar perfil" },
      { status: 500 }
    );
  }
}
