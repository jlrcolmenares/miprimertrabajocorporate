// Admin configuration - checks Firestore for admin status
import { isUserAdmin } from "./firestore-users";

/**
 * Check if a user is an admin by their UID
 * Looks up the isAdmin field in the user's Firestore document
 */
export async function checkIsAdmin(uid: string): Promise<boolean> {
  return isUserAdmin(uid);
}
