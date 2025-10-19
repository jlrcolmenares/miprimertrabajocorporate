# 🔥 Firebase & Firestore Setup Guide

## Overview

The application now uses Firebase Authentication and Firestore for user management and session handling. This provides:

- ✅ Secure authentication with Firebase Auth
- ✅ Scalable user storage with Firestore
- ✅ Proper session management
- ✅ Real-time capabilities (if needed later)
- ✅ Built-in security rules

---

## Prerequisites

- Google Cloud account (you mentioned you have gcloud installed)
- Firebase CLI (optional, but recommended)

---

## Step 1: Create Firebase Project

### Option A: Using Firebase Console (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `miprimertrabajocorporate` (or your preferred name)
4. **Disable Google Analytics** (not needed for this project)
5. Click "Create project"
6. Wait for project creation (~30 seconds)

### Option B: Using Existing Google Cloud Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Select "Use an existing Google Cloud project"
4. Choose your project from the dropdown
5. Click "Add Firebase"

---

## Step 2: Enable Firebase Authentication

1. In Firebase Console, click "Authentication" in the left sidebar
2. Click "Get started"
3. Click on "Email/Password" under "Sign-in method"
4. **Enable** the first toggle (Email/Password)
5. **Leave disabled** the second toggle (Email link - passwordless)
6. Click "Save"

---

## Step 3: Create Firestore Database

1. In Firebase Console, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Select **"Start in production mode"** (we'll add security rules later)
4. Choose a location closest to your users:
   - `europe-west1` (Belgium) - for Europe
   - `us-central1` (Iowa) - for US
   - `asia-southeast1` (Singapore) - for Asia
5. Click "Enable"
6. Wait for database creation (~1 minute)

---

## Step 4: Get Firebase Configuration

### For Client-Side (Web App)

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the **Web icon** `</>`
5. Enter app nickname: `Mi Primer Trabajo Corporate Web`
6. **Don't check** "Also set up Firebase Hosting"
7. Click "Register app"
8. Copy the `firebaseConfig` object

It will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

---

## Step 5: Generate Service Account Key (For Server-Side)

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Click the "Service accounts" tab
4. Click "Generate new private key"
5. Click "Generate key" in the confirmation dialog
6. A JSON file will download - **KEEP THIS SECURE!**

The file will look like:
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

---

## Step 6: Configure Environment Variables

Update your `.env.local` file with Firebase credentials:

```env
# Existing variables...
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Firebase Client Configuration (from Step 4)
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789012"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789012:web:abcdef123456"

# Firebase Admin Configuration (from Step 5)
# Option 1: Use the entire JSON as a string (easier for deployment)
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}'

# Option 2: Use individual fields (better for local development)
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Stripe Configuration (keep existing)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Course Configuration (keep existing)
NEXT_PUBLIC_COURSE_PRICE="9900"
NEXT_PUBLIC_CURRENCY="EUR"
ADMIN_EMAIL="your-email@example.com"
```

### Important Notes:

1. **Private Key Formatting**: The private key must include `\n` for line breaks
2. **No Quotes in .env.local**: Don't add extra quotes around values
3. **Service Account JSON**: You can use either the full JSON or individual fields

---

## Step 7: Set Up Firestore Security Rules

1. In Firebase Console, go to "Firestore Database"
2. Click the "Rules" tab
3. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      // Users can read their own document
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Only server (admin) can write
      allow write: if false;
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

4. Click "Publish"

### What these rules do:
- Users can only read their own user document
- Only server-side (Firebase Admin SDK) can create/update users
- All other access is denied

---

## Step 8: Test the Setup

### 1. Restart Development Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### 2. Test User Registration

1. Go to http://localhost:3000/login
2. Click "Registrarse"
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
4. Click "Crear Cuenta"

**Expected result:**
- User created in Firebase Authentication
- User document created in Firestore
- Redirected to dashboard

### 3. Verify in Firebase Console

**Check Authentication:**
1. Go to Firebase Console > Authentication > Users
2. You should see your test user

**Check Firestore:**
1. Go to Firebase Console > Firestore Database
2. You should see a `users` collection
3. Click on it to see your user document

### 4. Test Login

1. Logout from dashboard
2. Go to http://localhost:3000/login
3. Login with test@example.com / test123

**Expected result:**
- Successfully logged in
- Redirected to dashboard

---

## Step 9: Migrate Existing Users (If Any)

If you have users in the old `data/users.json` file:

### Option A: Manual Migration (Small Number of Users)

1. Go to Firebase Console > Authentication
2. Click "Add user"
3. Enter email and password
4. The Firestore document will be created automatically on first login

### Option B: Programmatic Migration (Many Users)

Create a migration script (not included, but can be created if needed).

---

## Troubleshooting

### Error: "Firebase: Error (auth/invalid-api-key)"

**Solution:**
- Check that `NEXT_PUBLIC_FIREBASE_API_KEY` is correct
- Make sure there are no extra spaces or quotes
- Restart development server

### Error: "Firebase: Error (auth/project-not-found)"

**Solution:**
- Check that `NEXT_PUBLIC_FIREBASE_PROJECT_ID` matches your Firebase project
- Verify project exists in Firebase Console

### Error: "Could not reach Cloud Firestore backend"

**Solution:**
- Check your internet connection
- Verify Firestore is enabled in Firebase Console
- Check browser console for CORS errors

### Error: "Permission denied" when reading/writing Firestore

**Solution:**
- Check Firestore security rules (Step 7)
- Make sure user is authenticated
- Verify user UID matches document ID

### Error: "Private key must be a string"

**Solution:**
- Check `FIREBASE_PRIVATE_KEY` format in `.env.local`
- Make sure it includes `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Ensure line breaks are represented as `\n`

### Error: "Service account key is invalid"

**Solution:**
- Re-download service account key from Firebase Console
- Make sure the entire JSON is properly formatted
- Try using `FIREBASE_SERVICE_ACCOUNT_KEY` with the full JSON

---

## Security Best Practices

### ✅ Do:
- Keep service account key secure and never commit to Git
- Use environment variables for all credentials
- Enable Firestore security rules
- Use HTTPS in production
- Regularly rotate service account keys

### ❌ Don't:
- Commit `.env.local` to Git (it's in `.gitignore`)
- Share service account key publicly
- Use admin SDK on client-side
- Disable Firestore security rules in production
- Use the same Firebase project for dev and production

---

## Production Deployment

### Vercel

1. Go to Vercel project settings
2. Add all Firebase environment variables
3. For `FIREBASE_PRIVATE_KEY`, replace `\n` with actual line breaks or keep as `\n`
4. Deploy

### AWS Lightsail

1. SSH into your instance
2. Create `.env.local` file
3. Add all Firebase environment variables
4. Restart your application

---

## Firestore Data Structure

### Users Collection

```
users/
  └── {uid}/
      ├── email: string
      ├── name: string
      ├── hasPaid: boolean
      ├── stripeCustomerId?: string
      ├── stripeSessionId?: string
      ├── createdAt: timestamp
      └── updatedAt: timestamp
```

### Future Collections (Optional)

```
courseProgress/
  └── {uid}/
      ├── moduleId: number
      ├── completed: boolean
      └── lastAccessed: timestamp

payments/
  └── {paymentId}/
      ├── userId: string
      ├── amount: number
      ├── currency: string
      ├── status: string
      └── createdAt: timestamp
```

---

## Next Steps

After Firebase is set up:

1. ✅ Test user registration and login
2. ✅ Verify users appear in Firebase Console
3. ✅ Test profile updates
4. 🔄 Update Stripe webhook to mark users as paid in Firestore
5. 🔄 Add course progress tracking (optional)
6. 🔄 Add email verification (optional)
7. 🔄 Add password reset flow (optional)

---

## Useful Commands

### Firebase CLI (Optional)

Install Firebase CLI:
```bash
npm install -g firebase-tools
```

Login to Firebase:
```bash
firebase login
```

Initialize Firebase in project:
```bash
firebase init
```

Deploy Firestore rules:
```bash
firebase deploy --only firestore:rules
```

---

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

---

**You're now ready to use Firebase Authentication and Firestore! 🎉**
