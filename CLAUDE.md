# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mi Primer Trabajo Corporate is a Spanish-language course platform built with Next.js 15 (App Router) for selling an online course about entering the corporate world. The platform includes user authentication, Stripe payment integration, and protected course content.

## Common Commands

```bash
npm run dev          # Start development server with Turbopack (localhost:3000)
npm run build        # Build for production with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint
```

**Clear cache and restart:**
```bash
rm -rf .next && npm run dev
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Authentication**: Firebase Authentication (client-side + Admin SDK server-side)
- **Database**: Cloud Firestore
- **Payments**: Stripe (checkout sessions + webhooks)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript, React 19

### Key Architectural Patterns

**Firebase Split:**
- `src/lib/firebase.ts` - Client-side Firebase (Auth, Firestore) for browser
- `src/lib/firebase-admin.ts` - Server-side Firebase Admin SDK for API routes

**User Data Flow:**
1. Firebase Auth handles authentication (client-side)
2. User documents stored in Firestore `users` collection
3. Server API routes use Admin SDK to read/write user data
4. `src/lib/firestore-users.ts` contains all Firestore user operations

**Payment Flow:**
1. `PaymentButton` component initiates checkout
2. `/api/stripe/create-checkout-session` creates Stripe session with user ID in metadata
3. Stripe redirects to `/success` after payment
4. `/api/stripe/webhook` receives `checkout.session.completed` event and marks user as paid via `markUserAsPaid()`

**Course Content Structure:**
- Course is organized as Sections containing Modules (defined in `src/data/courseStructure.ts`)
- Module content lives in `src/data/moduleContent/` as React components
- Module IDs follow pattern: `module-{section}-{order}` (e.g., `module-1-2`)
- Progress tracked via `completedModules` array on user document

### Security
- Middleware (`src/middleware.ts`) adds security headers and CSP to all routes
- Rate limiting available via `src/lib/rate-limit.ts`
- Stripe webhooks verify signature before processing

### API Routes Structure
```
/api/auth/           - Authentication (register, login, sync-user, get-user, update-profile)
/api/stripe/         - Payment (create-checkout-session, webhook)
/api/modules/        - Course progress (toggle-completion)
/api/admin/          - Admin operations (setup, users, validate)
```

## Environment Variables

Required variables (configured in `.env.local`):
- `NEXT_PUBLIC_FIREBASE_*` - Firebase client config (6 variables)
- `FIREBASE_SERVICE_ACCOUNT_KEY` or `FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY` - Firebase Admin
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` - Stripe
- `NEXT_PUBLIC_COURSE_PRICE` - Price in cents (e.g., "9900" for €99.00)

## Firestore Data Model

**users/{uid}**
```typescript
{
  email: string;
  name: string;
  hasPaid: boolean;
  completedModules?: string[];  // Array of module IDs
  stripeCustomerId?: string;
  stripeSessionId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Testing Payments

Use Stripe test mode with card: `4242 4242 4242 4242`, any future date, any CVC.
