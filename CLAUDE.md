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

## Writing Style Guide

For text correction and editing tasks, follow the rules defined in `.claude/writing-style.md`. This preserves the author's Venezuelan Spanish voice while correcting only technical errors (spelling, grammar, punctuation).

## Key Files Reference

```
src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx              # Main dashboard (different views for paid/unpaid)
│   │   ├── contenido/[moduleId]/ # Module content pages
│   │   └── perfil/               # User profile editing
│   └── api/                      # API routes
├── components/
│   ├── CourseSidebar.tsx         # Navigation sidebar for course
│   ├── PaymentButton.tsx         # Stripe checkout button
│   ├── CourseSection.tsx         # Section card (legacy, used in old dashboard)
│   └── ModuleCard.tsx            # Module card (legacy)
├── data/
│   ├── courseStructure.ts        # Section/module definitions
│   └── moduleContent/            # Module content files (module-X-Y.tsx)
└── lib/
    ├── firebase.ts               # Client-side Firebase
    ├── firebase-admin.ts         # Server-side Firebase Admin
    └── firestore-users.ts        # User CRUD operations
```
