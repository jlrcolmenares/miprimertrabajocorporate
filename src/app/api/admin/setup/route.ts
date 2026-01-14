import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { createUserDocument, getUserByEmail } from "@/lib/firestore-users";
import { getAdminCredentials } from "@/lib/admin-config";

/**
 * Setup admin user from environment variables
 * This endpoint creates the admin user if it doesn't exist
 */
export async function POST(req: NextRequest) {
  try {
    let email, password;
    try {
      ({ email, password } = getAdminCredentials());
    } catch (error) {
      return NextResponse.json(
        { error: "Admin credentials not configured in environment variables" },
        { status: 500 }
      );
    }

    // Check if admin user already exists
    const existingUser = await getUserByEmail(email);
    
    if (existingUser) {
      return NextResponse.json({
        message: "Admin user already exists",
        email: email,
        uid: existingUser.uid,
      });
    }

    // Create admin user in Firebase Auth
    const userRecord = await adminAuth.createUser({
      email: email,
      password: password,
      displayName: "Administrator",
    });

    // Create admin user document in Firestore with full access
    const userData = await createUserDocument(
      userRecord.uid, 
      email, 
      "Administrator", 
      true // hasPaid = true for admin
    );

    return NextResponse.json({
      message: "Admin user created successfully",
      email: email,
      uid: userData.uid,
      credentials: {
        email: email,
        password: password,
      }
    });
  } catch (error: any) {
    console.error("Error setting up admin user:", error);
    
    if (error.code === "auth/email-already-exists") {
      // User exists in Firebase Auth but not in Firestore, let's sync
      try {
        let email;
        try {
          ({ email } = getAdminCredentials());
        } catch (credError) {
          return NextResponse.json(
            { error: "Admin credentials not configured" },
            { status: 500 }
          );
        }
        const authUser = await adminAuth.getUserByEmail(email);
        
        const userData = await createUserDocument(
          authUser.uid,
          email,
          "Administrator",
          true
        );

        return NextResponse.json({
          message: "Admin user synced successfully",
          email: email,
          uid: userData.uid,
        });
      } catch (syncError) {
        return NextResponse.json(
          { error: "Admin user exists but sync failed" },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: "Error setting up admin user" },
      { status: 500 }
    );
  }
}
