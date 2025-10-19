// Server-side user management with Firestore
import { adminDb } from "./firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export interface FirestoreUser {
  uid: string;
  email: string;
  name: string;
  hasPaid: boolean;
  stripeCustomerId?: string;
  stripeSessionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const USERS_COLLECTION = "users";

/**
 * Create a new user document in Firestore
 */
export async function createUserDocument(
  uid: string,
  email: string,
  name: string,
  hasPaid: boolean = false
): Promise<FirestoreUser> {
  const userRef = adminDb.collection(USERS_COLLECTION).doc(uid);
  
  const userData: Omit<FirestoreUser, "uid"> = {
    email: email.toLowerCase(),
    name,
    hasPaid,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await userRef.set(userData);

  return {
    uid,
    ...userData,
  };
}

/**
 * Get user by UID
 */
export async function getUserByUid(uid: string): Promise<FirestoreUser | null> {
  const userDoc = await adminDb.collection(USERS_COLLECTION).doc(uid).get();
  
  if (!userDoc.exists) {
    return null;
  }

  return {
    uid: userDoc.id,
    ...userDoc.data(),
  } as FirestoreUser;
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<FirestoreUser | null> {
  const snapshot = await adminDb
    .collection(USERS_COLLECTION)
    .where("email", "==", email.toLowerCase())
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  return {
    uid: doc.id,
    ...doc.data(),
  } as FirestoreUser;
}

/**
 * Update user document
 */
export async function updateUserDocument(
  uid: string,
  updates: Partial<Omit<FirestoreUser, "uid" | "createdAt">>
): Promise<void> {
  const userRef = adminDb.collection(USERS_COLLECTION).doc(uid);
  
  await userRef.update({
    ...updates,
    updatedAt: new Date(),
  });
}

/**
 * Mark user as paid (after successful payment)
 */
export async function markUserAsPaid(
  uid: string,
  stripeCustomerId?: string,
  stripeSessionId?: string
): Promise<void> {
  await updateUserDocument(uid, {
    hasPaid: true,
    stripeCustomerId,
    stripeSessionId,
  });
}

/**
 * Update user profile (name, email)
 */
export async function updateUserProfile(
  uid: string,
  name?: string,
  email?: string
): Promise<void> {
  const updates: Partial<FirestoreUser> = {};
  
  if (name) updates.name = name;
  if (email) updates.email = email.toLowerCase();
  
  await updateUserDocument(uid, updates);
}

/**
 * Check if user has paid for the course
 */
export async function hasUserPaid(uid: string): Promise<boolean> {
  const user = await getUserByUid(uid);
  return user?.hasPaid || false;
}

/**
 * Delete user document (for cleanup/testing)
 */
export async function deleteUserDocument(uid: string): Promise<void> {
  await adminDb.collection(USERS_COLLECTION).doc(uid).delete();
}

/**
 * Get all users (admin only - use with caution)
 */
export async function getAllUsers(limit: number = 100): Promise<FirestoreUser[]> {
  const snapshot = await adminDb
    .collection(USERS_COLLECTION)
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data(),
  })) as FirestoreUser[];
}
