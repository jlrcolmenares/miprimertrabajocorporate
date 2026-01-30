# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mi Primer Trabajo Corporate is a Spanish-language course platform built with Next.js 15 (App Router) for selling an online course about entering the corporate world. The platform includes user authentication and protected course content.

**Author:** Jose Luis Colmenares (jlrcc991@hotmail.com)

## Common Commands

```bash
npm run dev          # Start development server with Turbopack (localhost:3000)
npm run build        # Build for production with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run prepare      # Reinstall Husky hooks
```

**Clear cache and restart:**
```bash
rm -rf .next && npm run dev
```

## Pre-commit Hook

The project uses **Husky + lint-staged** to run ESLint automatically before each commit.

- Configured in `package.json` under `lint-staged`
- Hook file: `.husky/pre-commit`
- Runs `eslint --fix` on staged `.ts/.tsx` files
- Blocks commit if there are unfixable errors

**Skip hook (not recommended):**
```bash
git commit -m "message" --no-verify
```

## Deployment

**Platform:** Vercel (auto-deploys on push to main)
**Repository:** github.com/jlrcolmenares/miprimertrabajocorporate (public)

```bash
git push origin main   # Triggers automatic Vercel deploy
```

**Required Vercel Environment Variables:**
- All `NEXT_PUBLIC_FIREBASE_*` variables
- `FIREBASE_SERVICE_ACCOUNT_KEY`

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Authentication**: Firebase Authentication (client-side + Admin SDK server-side)
- **Database**: Cloud Firestore
- **Payments**: Manual (via email) - Stripe infrastructure exists but is disabled
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

**Current Registration & Payment Flow (Manual - Temporary):**
> This flow will change in the future when Stripe integration is re-enabled.

1. User visits `/curso` and clicks "Solicitar Acceso"
2. This opens their email client with a pre-filled message to jlrcc991@hotmail.com
3. Admin (Jose Luis) receives the email and processes payment manually
4. Admin creates user account in Firebase Console or via admin panel
5. Admin sends login credentials to the user
6. User logs in at `/login` (public registration is disabled)

**Future Payment Flow (Stripe - Currently Disabled):**
The Stripe infrastructure exists and can be re-enabled:
1. `PaymentButton` component initiates checkout
2. `/api/stripe/create-checkout-session` creates Stripe session with user ID in metadata
3. Stripe redirects to `/success` after payment
4. `/api/stripe/webhook` receives `checkout.session.completed` event and marks user as paid via `markUserAsPaid()`

### Course Content Structure

**Sections and Modules:**
- Course is organized as 8 Sections (0-7) containing 33 Modules total
- Structure defined in `src/data/courseStructure.ts`
- Module content lives in `src/data/moduleContent/` as React components (one file per module)
- Module IDs follow pattern: `module-{section}-{order}` (e.g., `module-1-2`)
- Progress tracked via `completedModules` array on user document

**Current Sections:**
0. Introducción (1 module) - Welcome and course overview
1. Análisis del perfil profesional (3 modules)
2. Conócete a ti mismo (4 modules)
3. Análisis del mercado laboral (4 modules)
4. Preparación del CV (5 modules)
5. Preparación de entrevistas (6 modules)
6. Hacer ruido en la web (4 modules)
7. Cierre (5 modules) - Closing, resources, and next steps

**Helper Functions (courseStructure.ts):**
- `getAllModules()` - Flattens all modules across sections
- `getModuleById(moduleId)` - Get specific module
- `getSectionByModuleId(moduleId)` - Get section containing a module
- `getTotalModuleCount()` - Returns total module count
- `getNextModule(moduleId)` / `getPreviousModule(moduleId)` - Navigation

### UI Components

**CourseSidebar (`src/components/CourseSidebar.tsx`):**
- Collapsible navigation sidebar for course content
- Shows sections with expand/collapse functionality
- Displays module completion status (checkmarks)
- Progress bar in footer
- Responsive: hamburger menu on mobile
- Props: `completedModules`, `showBackLink`, `headerTitle`

**Layout Structure:**
- Dashboard (paid users): Two-column layout with CourseSidebar + main content
- Dashboard (unpaid users): Simple layout with course preview and payment button
- Module pages: Two-column layout with CourseSidebar + module content

**Color Scheme:**
- Primary: Blue (`blue-600`, `blue-700`)
- Success/Completed: Green (`green-500`, `green-600`)
- Warnings: Amber (`amber-500`)
- Background: Gray (`gray-50`, `gray-100`)

### Security
- Middleware (`src/middleware.ts`) adds security headers and CSP to all routes
- Rate limiting available via `src/lib/rate-limit.ts`
- Stripe webhooks verify signature before processing

### API Routes Structure
```
/api/auth/           - Authentication (sync-user, get-user, update-profile)
                       Note: register endpoint exists but public registration is disabled
/api/stripe/         - Payment (create-checkout-session, webhook) - Currently disabled
/api/modules/        - Course progress (toggle-completion)
/api/admin/          - Admin operations (users, validate)
```

### Admin Configuration

Admin status is determined by the `isAdmin` field in Firestore user documents:
- To make a user an admin, set `isAdmin: true` in their Firestore document
- Admin validation happens server-side via `/api/admin/validate`
- No environment variables needed for admin configuration

## Environment Variables

Required variables (configured in `.env.local`):
- `NEXT_PUBLIC_FIREBASE_*` - Firebase client config (6 variables)
- `FIREBASE_SERVICE_ACCOUNT_KEY` or `FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY` - Firebase Admin

Optional (for future Stripe integration):
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` - Stripe
- `NEXT_PUBLIC_COURSE_PRICE` - Price in cents (e.g., "9900" for €99.00)

## Firestore Data Model

**users/{uid}**
```typescript
{
  email: string;
  name: string;
  hasPaid: boolean;
  isAdmin?: boolean;            // Admin status (set manually in Firestore)
  completedModules?: string[];  // Array of module IDs
  stripeCustomerId?: string;
  stripeSessionId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Testing Payments (When Stripe is Re-enabled)

Use Stripe test mode with card: `4242 4242 4242 4242`, any future date, any CVC.

## Writing Style Guide

For text correction and editing tasks, follow the rules defined in `.claude/writing-style.md`. This preserves the author's Venezuelan Spanish voice while correcting only technical errors (spelling, grammar, punctuation).

## Key Files Reference

```
src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx              # Dashboard router (redirects by user type)
│   │   ├── course/page.tsx       # Course dashboard for paid users & admins
│   │   ├── preview/page.tsx      # Preview for unpaid users
│   │   ├── admin/page.tsx        # Admin panel for user management
│   │   ├── contenido/[moduleId]/ # Module content pages
│   │   └── perfil/               # User profile editing
│   └── api/                      # API routes
├── components/
│   ├── CourseSidebar.tsx         # Navigation sidebar for course
│   ├── Footer.tsx                # Global footer (included in layout)
│   ├── PaymentButton.tsx         # Stripe checkout button (currently disabled)
│   ├── CourseSection.tsx         # Section card (legacy)
│   └── ModuleCard.tsx            # Module card (legacy)
├── data/
│   ├── courseStructure.ts        # Section/module definitions
│   └── moduleContent/            # Module content files (module-X-Y.tsx)
└── lib/
    ├── firebase.ts               # Client-side Firebase
    ├── firebase-admin.ts         # Server-side Firebase Admin
    ├── firestore-users.ts        # User CRUD operations
    └── admin-config.ts           # Admin validation (checks Firestore)
```
