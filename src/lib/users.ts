import fs from "fs";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

export interface User {
  id: string;
  email: string;
  name: string;
  password: string; // hashed
  hasPaid: boolean;
  createdAt: string;
}

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  }
}

// Hash password
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Get all users
export function getUsers(): User[] {
  ensureDataDir();
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(data);
}

// Save users
function saveUsers(users: User[]) {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Find user by email
export function findUserByEmail(email: string): User | undefined {
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

// Find user by ID
export function findUserById(id: string): User | undefined {
  const users = getUsers();
  return users.find((u) => u.id === id);
}

// Create new user
export function createUser(email: string, name: string, password: string): User {
  const users = getUsers();
  
  if (findUserByEmail(email)) {
    throw new Error("User already exists");
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    name,
    password: hashPassword(password),
    hasPaid: false,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  
  return newUser;
}

// Update user
export function updateUser(id: string, updates: Partial<User>): User {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === id);
  
  if (index === -1) {
    throw new Error("User not found");
  }

  users[index] = { ...users[index], ...updates };
  saveUsers(users);
  
  return users[index];
}

// Verify password
export function verifyPassword(user: User, password: string): boolean {
  return user.password === hashPassword(password);
}

// Mark user as paid (call this after successful payment)
export function markUserAsPaid(email: string): User {
  const user = findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  return updateUser(user.id, { hasPaid: true });
}
