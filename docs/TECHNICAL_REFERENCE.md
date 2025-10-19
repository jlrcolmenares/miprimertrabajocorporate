# 🔧 Technical Reference

## Architecture Overview

This document explains the technical decisions, architecture, and implementation details of the Mi Primer Trabajo Corporate platform.

---

## Technology Stack

### Frontend Framework: Next.js 15 (App Router)

**Why Next.js?**
- Server-side rendering (SSR) for better SEO
- File-based routing system
- Built-in API routes
- Excellent performance with Turbopack
- Easy deployment to Vercel
- TypeScript support out of the box

**Why App Router (not Pages Router)?**
- Modern React Server Components
- Improved data fetching
- Better performance
- Nested layouts
- Streaming and Suspense support

### Styling: Tailwind CSS

**Why Tailwind?**
- Utility-first approach = faster development
- No CSS file management
- Built-in responsive design
- Easy to customize
- Small production bundle size
- Consistent design system

**Color Scheme:**
- Primary: `indigo-600` (#4F46E5)
- Background: Gradient from `blue-50` to `indigo-100`
- Text: `gray-900` for headings, `gray-600` for body
- Success: `green-600`
- Error: `red-600`

### Language: TypeScript

**Why TypeScript?**
- Type safety prevents runtime errors
- Better IDE autocomplete
- Self-documenting code
- Easier refactoring
- Catches bugs at compile time

### Payment Processing: Stripe

**Why Stripe?**
- Industry standard for online payments
- Excellent documentation
- Built-in fraud prevention
- PCI compliance handled
- Test mode for development
- Supports multiple currencies
- Checkout UI handled by Stripe

**Implementation:**
- Stripe Checkout (hosted payment page)
- Server-side API integration
- Webhook support for automation

---

## Project Structure

### Directory Layout

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (not created - using default)
│   ├── page.tsx                 # Landing page (/)
│   ├── sobre-mi/
│   │   └── page.tsx            # About page (/sobre-mi)
│   ├── curso/
│   │   └── page.tsx            # Course page (/curso)
│   ├── login/
│   │   └── page.tsx            # Auth page (/login)
│   ├── success/
│   │   └── page.tsx            # Payment success (/success)
│   ├── dashboard/
│   │   ├── page.tsx            # Dashboard home (/dashboard)
│   │   ├── perfil/
│   │   │   └── page.tsx        # Profile edit (/dashboard/perfil)
│   │   └── contenido/
│   │       └── [moduleId]/
│   │           └── page.tsx    # Course content (/dashboard/contenido/1)
│   └── api/                     # Backend API routes
│       ├── auth/
│       │   ├── login/
│       │   │   └── route.ts    # POST /api/auth/login
│       │   ├── register/
│       │   │   └── route.ts    # POST /api/auth/register
│       │   └── update-profile/
│       │       └── route.ts    # POST /api/auth/update-profile
│       └── create-checkout-session/
│           └── route.ts         # POST /api/create-checkout-session
└── lib/
    └── users.ts                 # User management utilities
```

### File Naming Conventions

- **Pages**: `page.tsx` (Next.js convention)
- **API Routes**: `route.ts` (Next.js convention)
- **Components**: Would be `ComponentName.tsx` (if we had separate components)
- **Utilities**: `kebab-case.ts`

---

## Authentication System

### Design Decision: Custom File-Based Auth

**Why not NextAuth.js or other libraries?**
- Simpler for MVP/small scale
- No external dependencies for auth
- Full control over user data
- Easy to understand and modify
- No database setup required initially

**Trade-offs:**
- ✅ Simple implementation
- ✅ No external services needed
- ✅ Easy to debug
- ❌ Not suitable for large scale
- ❌ Manual session management
- ❌ Should migrate to proper auth for production

### Implementation Details

**User Storage:**
- File: `data/users.json`
- Format: JSON array of user objects
- Created automatically on first user registration

**User Schema:**
```typescript
interface User {
  id: string;           // UUID v4
  email: string;        // Lowercase, unique
  name: string;         // Display name
  password: string;     // SHA-256 hashed
  hasPaid: boolean;     // Payment status
  createdAt: string;    // ISO timestamp
}
```

**Password Security:**
- Hashing: SHA-256 (via Node.js crypto)
- Salt: Not implemented (should add for production)
- Storage: Never returned in API responses

**Session Management:**
- Client-side: localStorage
- Server-side: None (stateless)
- Token: User object stored in localStorage

**Security Considerations:**
- ⚠️ localStorage is vulnerable to XSS
- ⚠️ No JWT or session tokens
- ⚠️ No refresh tokens
- ⚠️ Should implement proper auth for production

### Authentication Flow

**Registration:**
1. User submits form → `/api/auth/register`
2. Validate email uniqueness
3. Hash password with SHA-256
4. Create user in `users.json`
5. Return user object (without password)
6. Store in localStorage
7. Redirect to dashboard

**Login:**
1. User submits credentials → `/api/auth/login`
2. Find user by email
3. Verify password hash
4. Return user object (without password)
5. Store in localStorage
6. Redirect to dashboard

**Authorization:**
1. Client reads user from localStorage
2. Checks `hasPaid` flag
3. Shows/hides content accordingly
4. No server-side verification (⚠️ security issue)

---

## Payment System

### Stripe Integration

**Flow:**
1. User clicks "Comprar Ahora" on `/curso`
2. Client calls `/api/create-checkout-session`
3. Server creates Stripe Checkout Session
4. User redirected to Stripe hosted page
5. User completes payment
6. Stripe redirects to `/success?session_id=xxx`
7. User sees success page

**Current Limitation:**
- ⚠️ No webhook handler implemented
- ⚠️ `hasPaid` must be manually updated
- ⚠️ No automatic access grant

**Production Requirements:**
1. Implement webhook endpoint: `/api/webhooks/stripe`
2. Verify webhook signature
3. Handle `checkout.session.completed` event
4. Update user's `hasPaid` status automatically
5. Send confirmation email (optional)

### Stripe Checkout Configuration

```typescript
stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  line_items: [{
    price_data: {
      currency: "eur",
      product_data: {
        name: "Mi Primer Trabajo Corporate - Curso Completo",
        description: "Acceso completo y permanente al curso",
      },
      unit_amount: 9900, // €99.00 in cents
    },
    quantity: 1,
  }],
  mode: "payment",        // One-time payment
  success_url: "/success",
  cancel_url: "/curso",
})
```

---

## Data Storage

### Current: File-Based JSON

**Location:** `data/users.json`

**Structure:**
```json
[
  {
    "id": "uuid-here",
    "email": "user@example.com",
    "name": "User Name",
    "password": "hashed-password",
    "hasPaid": false,
    "createdAt": "2025-01-19T12:00:00.000Z"
  }
]
```

**Operations:**
- Read: `fs.readFileSync()`
- Write: `fs.writeFileSync()`
- Atomic: No (⚠️ race condition possible)

**Limitations:**
- ❌ Not scalable
- ❌ No concurrent access handling
- ❌ No transactions
- ❌ No indexing
- ❌ No relationships
- ❌ File can be corrupted

### Recommended Migration: PostgreSQL

**Why PostgreSQL?**
- ACID compliance
- Proper indexing
- Concurrent access
- Relationships
- Backup/restore
- Production-ready

**Schema:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  has_paid BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_has_paid ON users(has_paid);
```

**Migration Path:**
1. Set up PostgreSQL database
2. Install `pg` or use Prisma ORM
3. Create schema
4. Migrate existing users from JSON
5. Update `lib/users.ts` to use database
6. Test thoroughly
7. Deploy

---

## API Design

### RESTful Endpoints

**Authentication:**
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/update-profile` - Update user info

**Payments:**
- `POST /api/create-checkout-session` - Create Stripe session

**Future Endpoints:**
- `POST /api/webhooks/stripe` - Handle Stripe events
- `GET /api/user/progress` - Get course progress
- `POST /api/user/progress` - Update course progress

### Request/Response Format

**Standard Success Response:**
```json
{
  "message": "Success message",
  "user": { /* user object */ }
}
```

**Standard Error Response:**
```json
{
  "error": "Error message"
}
```

**HTTP Status Codes:**
- `200` - Success
- `400` - Bad request (validation error)
- `401` - Unauthorized (auth failed)
- `404` - Not found
- `500` - Server error

---

## Frontend Architecture

### Component Structure

**Current: Page-Level Components**
- All UI in page files
- No component extraction
- Inline styling with Tailwind

**Reason:**
- Faster initial development
- Less file management
- Simpler for small project

**Refactoring Recommendation:**
```
src/
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── course/
│   │   ├── ModuleCard.tsx
│   │   └── PricingCard.tsx
│   └── ui/
│       ├── Button.tsx
│       └── Input.tsx
```

### State Management

**Current: React useState + localStorage**
- User state in localStorage
- Component state with useState
- No global state management

**Why no Redux/Zustand?**
- Simple app doesn't need it
- localStorage sufficient for user data
- Most data is server-fetched

**When to add:**
- If app grows significantly
- If sharing state across many components
- If complex state logic emerges

### Client vs Server Components

**Client Components** (`"use client"`):
- `/login` - Form interactions
- `/curso` - Payment button
- `/dashboard/*` - User interactions
- `/success` - URL params reading

**Server Components** (default):
- `/` - Landing page (static)
- `/sobre-mi` - About page (static)

**Why this split?**
- Client components for interactivity
- Server components for static content
- Better performance and SEO

---

## Security Considerations

### Current Security Measures

✅ **Implemented:**
- Password hashing (SHA-256)
- Environment variables for secrets
- Stripe handles payment security
- HTTPS in production (via hosting)
- `.env.local` in `.gitignore`

⚠️ **Missing (Should Add):**
- Password salting
- JWT tokens for sessions
- CSRF protection
- Rate limiting
- Input sanitization
- XSS protection
- SQL injection prevention (when using DB)
- Session expiration
- Refresh tokens

### Production Security Checklist

- [ ] Implement proper authentication (JWT/NextAuth)
- [ ] Add password salting (bcrypt)
- [ ] Implement CSRF tokens
- [ ] Add rate limiting (express-rate-limit)
- [ ] Sanitize all user inputs
- [ ] Implement session expiration
- [ ] Add security headers (helmet.js)
- [ ] Enable HTTPS only
- [ ] Implement webhook signature verification
- [ ] Add logging and monitoring
- [ ] Regular security audits
- [ ] Dependency vulnerability scanning

---

## Performance Optimizations

### Implemented

✅ **Next.js Optimizations:**
- Automatic code splitting
- Image optimization (next/image)
- Font optimization (next/font)
- Turbopack for faster builds

✅ **Tailwind CSS:**
- PurgeCSS removes unused styles
- Minimal CSS bundle size

### Potential Improvements

**Caching:**
- Add Redis for session storage
- Cache user data
- Cache course content

**Database:**
- Add indexes on frequently queried fields
- Implement connection pooling
- Use read replicas for scaling

**CDN:**
- Serve static assets from CDN
- Cache API responses where appropriate

**Code Splitting:**
- Lazy load course modules
- Dynamic imports for heavy components

---

## Deployment Architecture

### Recommended: Vercel

**Why Vercel?**
- Built by Next.js creators
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Serverless functions
- Environment variables UI
- Preview deployments
- Free tier available

**Deployment Process:**
1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically on push

### Alternative: AWS Lightsail

**Setup:**
1. Create Lightsail instance (Node.js)
2. SSH into instance
3. Clone repository
4. Install dependencies
5. Configure environment variables
6. Build: `npm run build`
7. Start: `npm start`
8. Use PM2 for process management
9. Configure Nginx as reverse proxy
10. Set up SSL with Let's Encrypt

### Database Hosting

**Options:**
- **Vercel Postgres** - Integrated with Vercel
- **Supabase** - PostgreSQL with auth
- **PlanetScale** - MySQL serverless
- **AWS RDS** - Traditional PostgreSQL
- **Railway** - Simple PostgreSQL hosting

---

## Testing Strategy

### Current State

❌ **No tests implemented**

**Why?**
- MVP/prototype phase
- Faster initial development
- Small codebase

### Recommended Testing

**Unit Tests:**
```typescript
// lib/users.test.ts
describe('User Management', () => {
  test('creates user with hashed password', () => {
    // Test user creation
  });
  
  test('verifies password correctly', () => {
    // Test password verification
  });
});
```

**Integration Tests:**
```typescript
// api/auth/register.test.ts
describe('POST /api/auth/register', () => {
  test('creates new user', async () => {
    // Test registration endpoint
  });
});
```

**E2E Tests (Playwright):**
```typescript
test('user can purchase course', async ({ page }) => {
  await page.goto('/curso');
  await page.click('text=Comprar Ahora');
  // ... complete checkout flow
});
```

---

## Scalability Considerations

### Current Limitations

- File-based storage (max ~1000 users)
- No caching
- No load balancing
- Single server deployment

### Scaling Path

**Phase 1: 0-100 users**
- Current setup sufficient
- File-based storage OK
- Single Vercel deployment

**Phase 2: 100-1,000 users**
- Migrate to PostgreSQL
- Add Redis caching
- Implement proper auth

**Phase 3: 1,000-10,000 users**
- Database read replicas
- CDN for static assets
- Separate API server
- Implement monitoring

**Phase 4: 10,000+ users**
- Microservices architecture
- Kubernetes orchestration
- Multiple database instances
- Advanced caching strategies

---

## Future Enhancements

### Phase 2 Features

**User Experience:**
- Email notifications
- Password reset flow
- Email verification
- Course progress tracking
- Completion certificates
- Downloadable resources

**Content:**
- Video support
- Quizzes and assessments
- Discussion forums
- Live Q&A sessions

**Admin:**
- Admin dashboard
- User management
- Content management
- Analytics dashboard

**Technical:**
- Automated webhook handling
- Proper authentication
- Database migration
- Comprehensive testing

### Phase 3 Features

**Advanced:**
- Mobile app
- Offline access
- Multi-language support
- Affiliate program
- Subscription model
- Course bundles
- Student community

---

## Code Style & Conventions

### TypeScript

- Use interfaces for object shapes
- Avoid `any` type
- Use optional chaining (`?.`)
- Use nullish coalescing (`??`)

### React

- Functional components only
- Hooks for state management
- Descriptive component names
- Props interfaces defined

### Tailwind

- Use utility classes
- Avoid custom CSS
- Responsive design first
- Consistent spacing scale

### File Organization

- One component per file
- Colocate related files
- Group by feature, not type

---

## Monitoring & Logging

### Recommended Tools

**Error Tracking:**
- Sentry - Error monitoring
- LogRocket - Session replay

**Analytics:**
- Google Analytics - User behavior
- Plausible - Privacy-friendly analytics

**Performance:**
- Vercel Analytics - Core Web Vitals
- Lighthouse - Performance audits

**Uptime:**
- UptimeRobot - Uptime monitoring
- Pingdom - Performance monitoring

---

## Documentation Standards

### Code Comments

```typescript
/**
 * Creates a new user account
 * @param email - User's email address
 * @param name - User's full name
 * @param password - Plain text password (will be hashed)
 * @returns Created user object without password
 * @throws Error if email already exists
 */
export function createUser(email: string, name: string, password: string): User {
  // Implementation
}
```

### API Documentation

Each endpoint should document:
- Method and path
- Request body schema
- Response schema
- Error responses
- Example usage

---

## Conclusion

This technical reference documents the current state and future direction of the platform. As the project evolves, update this document to reflect architectural changes and decisions.

**Key Takeaways:**
- Simple architecture for MVP
- Clear migration path to production
- Security improvements needed
- Scalability considerations documented
- Testing strategy defined

**Next Steps:**
1. Implement webhook handling
2. Migrate to proper database
3. Add comprehensive testing
4. Implement proper authentication
5. Add monitoring and logging
