# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Version:** 1.0.0 (January 2026)

Mi Primer Trabajo Corporate is a Spanish-language course platform built with Next.js 15 (App Router) for selling an online course about entering the corporate world. The platform includes user authentication, protected course content, and an admin panel for user management.

**Author:** Jose Luis Colmenares (jlrcc991@hotmail.com)
**Repository:** github.com/jlrcolmenares/miprimertrabajocorporate (public)
**Production:** Deployed on Vercel (auto-deploys on push to main)

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

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Authentication**: Firebase Authentication (client-side + Admin SDK server-side)
- **Database**: Cloud Firestore
- **Payments**: Manual (via email) - Stripe infrastructure exists but is disabled
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript, React 19

### Dashboard Structure (v1.0.0)

The dashboard is split into three distinct experiences based on user type:

| Route | User Type | Description |
|-------|-----------|-------------|
| `/dashboard` | All | Smart router that redirects based on user type |
| `/dashboard/course` | Paid + Admin | Full course access with sidebar and progress |
| `/dashboard/preview` | Unpaid only | Section titles preview + "Solicitar Acceso" button |
| `/dashboard/admin` | Admin only | User management panel |
| `/dashboard/contenido/[moduleId]` | Paid + Admin | Module content pages |
| `/dashboard/perfil` | All authenticated | Profile editing |

**Access Control:**
- **Admin**: Can access all dashboard routes including `/dashboard/admin`
- **Paid users**: Can access `/dashboard/course`, `/dashboard/contenido/*`, `/dashboard/perfil`
- **Unpaid users**: Can ONLY access `/dashboard/preview` and `/dashboard/perfil`

**Redirect Flow After Login:**
```
Login successful
    ↓
Redirect to /dashboard
    ↓
Router checks user type (localStorage: isAdmin, user.hasPaid)
    ↓
├─ isAdmin=true → /dashboard/admin
├─ hasPaid=true → /dashboard/course
└─ hasPaid=false → /dashboard/preview
```

### Key Architectural Patterns

**Firebase Split:**
- `src/lib/firebase.ts` - Client-side Firebase (Auth, Firestore) for browser
- `src/lib/firebase-admin.ts` - Server-side Firebase Admin SDK for API routes

**User Data Flow:**
1. Firebase Auth handles authentication (client-side)
2. User documents stored in Firestore `users` collection
3. Server API routes use Admin SDK to read/write user data
4. `src/lib/firestore-users.ts` contains all Firestore user operations

**Client-Side State:**
- User data cached in `localStorage.user` (JSON string)
- Auth token in `localStorage.idToken`
- Admin status in `localStorage.isAdmin` ("true" or "false")

### User Flows

**Admin Flow (Invitation & Activation):**
1. Admin goes to `/dashboard/admin`
2. Admin enters user email in "Invitar Usuario" and clicks send
3. System automatically creates user account with Firebase Admin SDK
4. Firebase sends professional branded password reset email to user
5. User receives email and clicks link to set their password
6. User sets password and logs in at `/login`
7. Admin sees new user in admin panel (hasPaid: false)
8. Admin clicks "Marcar Pagado" after receiving payment
9. User logs out/in or refreshes to get updated access

**Email Customization:**
- Email templates configured in Firebase Console > Authentication > Templates
- Template used: Password reset (acts as invitation)
- Customizable: sender name, subject, message body, branding
- Default sender: noreply@miprimertrabajocorporate.firebaseapp.com
- Can configure custom domain for professional email address

**Paid User Flow:**
1. User logs in at `/login`
2. Redirected to `/dashboard` → `/dashboard/course`
3. Sees progress, "Continue Learning" card, and course content
4. Can navigate modules via sidebar or direct links
5. Progress tracked via `completedModules` array

**Unpaid User Flow:**
1. User logs in at `/login`
2. Redirected to `/dashboard` → `/dashboard/preview`
3. Sees section titles only (no module links)
4. "Solicitar Acceso" button opens email to request access
5. Cannot access `/dashboard/course` or `/dashboard/contenido/*`

### Course Content Structure

**Sections and Modules:**
- Course is organized as 8 Sections (0-7) containing 33 Modules total
- Structure defined in `src/data/courseStructure.ts`
- Module content lives in `src/data/moduleContent/` as React components (one file per module)
- Module IDs follow pattern: `module-{section}-{order}` (e.g., `module-1-2`)
- Progress tracked via `completedModules` array on user document

**Current Sections:**
0. Introduccion (1 module) - Welcome and course overview
1. Analisis del perfil profesional (3 modules)
2. Conocete a ti mismo (4 modules)
3. Analisis del mercado laboral (4 modules)
4. Preparacion del CV (5 modules)
5. Preparacion de entrevistas (7 modules)
6. Ser un lider de opinion (4 modules)
7. Cierre (5 modules) - Closing, resources, and next steps

**Helper Functions (courseStructure.ts):**
- `getAllModules()` - Flattens all modules across sections
- `getModuleById(moduleId)` - Get specific module
- `getSectionByModuleId(moduleId)` - Get section containing a module
- `getTotalModuleCount()` - Returns total module count
- `getNextModule(moduleId)` / `getPreviousModule(moduleId)` - Navigation
- `getSectionColor(sectionId)` - Returns the color class for a section

### Visual Enhancements & Animations

**Animation System (`src/app/globals.css`):**
The platform uses CSS keyframe animations (no external libraries) for smooth, performant effects:
- `celebrate` - Scale pulse animation for celebration modal
- `confettiPop` - Confetti particle effect (translate + fade)
- `fadeInUp` - Fade in with upward slide (landing page hero)
- `fadeInScale` - Fade in with scale (feature cards)
- `progressFill` - Progress bar fill animation
- `milestonePulse` - Pulsing effect for milestone markers
- **Accessibility**: Respects `prefers-reduced-motion` media query

**Progress Visualization:**
- **Milestone Celebration**: Triggers at 25%, 50%, 75%, 100% completion
- **Detection**: Calculates percentage after each module completion
- **Messages**: Spanish motivational messages per milestone
- **Animation**: Confetti particles with staggered delays
- **Component**: `CelebrationModal.tsx`

**Landing Page Animations:**
- **Hero Section**: Staggered fade-in on page load (title → subtitle → buttons)
- **Features Grid**: Scroll-triggered fade-in with scale effect using Intersection Observer
- **Value Proposition**: Scroll-triggered fade-in
- **Timing**: Delays of 0ms, 150ms-200ms, 300ms-400ms for natural flow

**Typography Enhancements:**
- Module content headings have colored left borders
- h1: 4px blue border, 2.5rem font size
- h2: 3px blue border
- h3: 2px light blue border
- Better visual hierarchy and content organization

**Section Color Coding:**
- Each of 8 sections has a unique color (defined in `courseStructure.ts`)
- Applied to: sidebar badges, active section backgrounds, module breadcrumbs
- Active sections show colored badge and light background tint
- Completed sections show green badge
- CSS variables in `globals.css` define section colors

### UI Components

**CourseSidebar (`src/components/CourseSidebar.tsx`):**
- Collapsible navigation sidebar for course content
- Shows sections with expand/collapse functionality (with section color coding)
- Displays module completion status (checkmarks)
- Progress bar in footer
- Responsive: hamburger menu on mobile
- Props: `completedModules`, `showBackLink`, `headerTitle`
- **Section colors**: Each section badge uses its unique color when active

**CelebrationModal (`src/components/CelebrationModal.tsx`):**
- Animated modal for milestone achievements (25%, 50%, 75%, 100%)
- Confetti animation with CSS keyframes
- Spanish motivational messages
- Auto-dismisses after 3 seconds
- Props: `milestone`, `onClose`

**Custom Hooks:**
- `useInView` (`src/hooks/useInView.ts`): Intersection Observer hook for scroll-triggered animations

**Color Scheme:**
- Primary: Blue (`blue-600`, `blue-700`)
- Success/Completed: Green (`green-500`, `green-600`)
- Admin accent: Amber (`amber-500`, `amber-600`)
- Background: Gray (`gray-50`, `gray-100`)

**Section Colors (8 unique colors):**
- Section 0 (Introducción): Blue (`blue-600`)
- Section 1 (Análisis perfil): Emerald (`emerald-600`)
- Section 2 (Conócete): Purple (`purple-600`)
- Section 3 (Mercado laboral): Orange (`orange-600`)
- Section 4 (CV): Rose (`rose-600`)
- Section 5 (Entrevistas): Indigo (`indigo-600`)
- Section 6 (Hacer ruido): Teal (`teal-600`)
- Section 7 (Cierre): Amber (`amber-600`)

### Security
- Middleware (`src/middleware.ts`) adds security headers and CSP to all routes
- Rate limiting available via `src/lib/rate-limit.ts`
- Stripe webhooks verify signature before processing
- Admin validation happens server-side via `/api/admin/validate`

### API Routes Structure
```
/api/auth/           - Authentication (sync-user, get-user, update-profile)
                       Note: register endpoint exists but public registration is disabled
/api/stripe/         - Payment (create-checkout-session, webhook) - Currently disabled
/api/modules/        - Course progress (toggle-completion)
/api/admin/          - Admin operations (users, validate, invite-user)
                       invite-user: Creates user account + sends Firebase Auth email
```

### Admin Configuration

Admin status is determined by the `isAdmin` field in Firestore user documents:
- To make a user an admin, set `isAdmin: true` in their Firestore document
- Admin validation happens server-side via `/api/admin/validate`
- No environment variables needed for admin configuration

**To create the first admin:**
1. Create a user account via Firebase Console or `/register`
2. Go to Firebase Console > Firestore Database
3. Find the user in `users` collection
4. Add field `isAdmin: true`
5. User logs out and back in to get admin access

## Environment Variables

Required variables (configured in `.env.local` and Vercel):
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
│   ├── login/page.tsx            # Login page (main entry point)
│   ├── register/page.tsx         # Registration (via admin invitation)
│   ├── curso/page.tsx            # Public course info page
│   └── api/                      # API routes
├── components/
│   ├── CourseSidebar.tsx         # Navigation sidebar (color-coded sections)
│   ├── CelebrationModal.tsx      # Milestone celebration modal
│   ├── Footer.tsx                # Global footer (included in layout)
│   └── PaymentButton.tsx         # Stripe checkout button (currently disabled)
├── hooks/
│   └── useInView.ts              # Intersection Observer hook for scroll animations
├── data/
│   ├── courseStructure.ts        # Section/module definitions with colors
│   └── moduleContent/            # Module content files (module-X-Y.tsx)
└── lib/
    ├── firebase.ts               # Client-side Firebase
    ├── firebase-admin.ts         # Server-side Firebase Admin
    ├── firestore-users.ts        # User CRUD operations
    └── admin-config.ts           # Admin validation (checks Firestore)
```

## Version History

- **v1.1.0** (February 2026): Visual enhancements and animations
  - Milestone celebration system (25%, 50%, 75%, 100% completion)
  - Landing page animations (hero, features grid, scroll triggers)
  - Section color coding system (8 unique colors)
  - Typography enhancements with colored left borders
  - CSS animation keyframes for smooth transitions
  - Intersection Observer for scroll-triggered effects
  - Enhanced shadows and border-radius throughout
  - Accessibility support for reduced motion preferences
  - Firebase Auth automated invitation emails

- **v1.0.0** (January 2026): Production-ready release
  - Dashboard split by user type (admin/paid/unpaid)
  - Admin panel for user management
  - Firestore-based admin configuration
  - Manual payment flow via email
  - Course content with 8 sections, 33 modules
  - Progress tracking with module completion
