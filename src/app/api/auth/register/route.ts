import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { createUserDocument } from "@/lib/firestore-users";

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

    // Create user in Firebase Authentication
    const userRecord = await adminAuth.createUser({
      email: email.toLowerCase(),
      password,
      displayName: name,
    });

    // Create user document in Firestore
    const userData = await createUserDocument(userRecord.uid, email, name);

    // Create custom token for immediate login
    const customToken = await adminAuth.createCustomToken(userRecord.uid);

    return NextResponse.json({
      message: "Usuario creado exitosamente",
      user: {
        uid: userData.uid,
        email: userData.email,
        name: userData.name,
        hasPaid: userData.hasPaid,
      },
      token: customToken,
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    
    if (error.code === "auth/email-already-exists") {
      return NextResponse.json(
        { error: "Este email ya está registrado" },
        { status: 400 }
      );
    }

    if (error.code === "auth/invalid-email") {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    if (error.code === "auth/weak-password") {
      return NextResponse.json(
        { error: "La contraseña es muy débil" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Error al crear usuario" },
      { status: 500 }
    );
  }
}
