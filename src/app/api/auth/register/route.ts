import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/users";

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json();

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    const user = createUser(email, name, password);

    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Usuario creado exitosamente",
      user: userWithoutPassword,
    });
  } catch (error: any) {
    if (error.message === "User already exists") {
      return NextResponse.json(
        { error: "Este email ya está registrado" },
        { status: 400 }
      );
    }
    
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Error al crear usuario" },
      { status: 500 }
    );
  }
}
