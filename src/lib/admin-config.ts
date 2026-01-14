// Admin configuration using environment variables only
export function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  
  if (!email || !password) {
    throw new Error("Admin credentials not configured in environment variables");
  }
  
  return { email, password };
}

export function isAdminEmail(email: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    return false;
  }
  return email.toLowerCase() === adminEmail.toLowerCase();
}
