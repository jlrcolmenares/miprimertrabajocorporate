# 🛠️ Local Development Guide

## Prerequisites

Before you start, ensure you have:

- **Node.js**: Version 18 or higher
- **npm**: Comes with Node.js
- **Terminal/Command Line**: Access to run commands
- **Code Editor**: VS Code, Cursor, or similar

## Check Your Environment

### 1. Verify Node.js Installation

```bash
node --version
# Should show v18.0.0 or higher
```

If not installed, download from: https://nodejs.org/

### 2. Verify npm Installation

```bash
npm --version
# Should show 9.0.0 or higher
```

## Initial Setup
DF
### 1. Install Dependencies

```bash
cd incorporate
npm install
```

**Expected output:**
- Should install ~400 packages
- No errors or warnings
- Creates `node_modules/` folder

### 2. Create Environment File

Create `.env.local` in the project root:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-here"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_key"
STRIPE_SECRET_KEY="sk_test_your_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook"
NEXT_PUBLIC_COURSE_PRICE="9900"
NEXT_PUBLIC_CURRENCY="EUR"
```

### 3. Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Copy the output and paste it into `.env.local` as `NEXTAUTH_SECRET`

### 4. Verify Environment File

Check that `.env.local` exists:

```bash
ls -la | grep .env.local
```

Should show: `.env.local`

## Start Development Server

### Start the Server

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 15.5.6 (Turbopack)
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Starting...
✓ Ready in 3.2s
```

### Verify Server is Running

Open your browser and visit:
- http://localhost:3000

You should see the landing page.

## Environment Checklist

### ✅ Required for Basic Functionality

- [x] Node.js installed (v18+)
- [x] npm installed
- [x] Dependencies installed (`node_modules/` exists)
- [x] `.env.local` file created
- [x] `NEXTAUTH_SECRET` generated and set
- [x] Server starts without errors
- [x] Can access http://localhost:3000

### ⚠️ Required for Full Functionality

- [X] Stripe account created
- [X] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` set
- [X] `STRIPE_SECRET_KEY` set
- [X] Payment flow tested

## Common Development Tasks

### Stop the Server

Press `Ctrl + C` in the terminal

### Restart the Server

```bash
npm run dev
```

### Clear Cache and Restart

```bash
rm -rf .next
npm run dev
```

### Install New Package

```bash
npm install package-name
```

### Check for Errors

Look for:
1. **Terminal errors**: Red text in terminal
2. **Browser console errors**: Press F12, check Console tab
3. **Build errors**: Shown when starting server

## File Structure for Development

```
incorporate/
├── .env.local              ← YOU CREATE THIS (not in git)
├── .next/                  ← Build cache (auto-generated)
├── node_modules/           ← Dependencies (auto-generated)
├── data/
│   └── users.json          ← User database (auto-created)
├── docs/                   ← Documentation
├── public/                 ← Static files
├── src/
│   ├── app/               ← Pages and routes
│   │   ├── page.tsx       ← Landing page
│   │   ├── sobre-mi/      ← About page
│   │   ├── curso/         ← Course page
│   │   ├── login/         ← Auth pages
│   │   ├── dashboard/     ← User dashboard
│   │   └── api/           ← Backend APIs
│   └── lib/
│       └── users.ts       ← User management logic
├── package.json           ← Dependencies list
└── tsconfig.json          ← TypeScript config
```

## Testing Your Local Setup

### 1. Test Landing Page

Visit: http://localhost:3000

**Should see:**
- Navigation bar
- Hero section with title
- Call-to-action buttons
- Features section
- Footer

### 2. Test Navigation

Click these links and verify they work:
- "Inicio" → Landing page
- "Sobre Mí" → About page
- "El Curso" → Course page
- "Iniciar Sesión" → Login page

### 3. Test User Registration

1. Go to http://localhost:3000/login
2. Click "Registrarse"
3. Fill in:
   - Name: Test User
   - Email: test@test.com
   - Password: test123
4. Click "Crear Cuenta"

**Expected result:**
- Redirected to dashboard
- See welcome message with your name

### 4. Test User Data Storage

Check that user was created:

```bash
cat data/users.json
```

Should show JSON with your test user.

### 5. Test Login

1. Logout (click "Cerrar Sesión")
2. Go to http://localhost:3000/login
3. Login with test@test.com / test123

**Expected result:**
- Successfully logged in
- Redirected to dashboard

## Development Workflow

### Making Changes

1. **Edit files** in `src/app/`
2. **Save the file**
3. **Browser auto-refreshes** (Hot Module Replacement)
4. **Check for errors** in terminal and browser console

### Adding Content

**Edit About Me page:**
```bash
# Open in your editor
src/app/sobre-mi/page.tsx
```

**Edit Course modules:**
```bash
# Open in your editor
src/app/dashboard/contenido/[moduleId]/page.tsx
```

**Edit Landing page:**
```bash
# Open in your editor
src/app/page.tsx
```

### Testing Changes

After making changes:
1. Save the file
2. Check terminal for errors
3. Check browser for visual changes
4. Test functionality (click buttons, submit forms)

## Troubleshooting

### Server Won't Start

**Error: "Port 3000 already in use"**
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9
# Or use different port
npm run dev -- -p 3001
```

**Error: "Cannot find module"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Error: "Command not found: npm"**
- Install Node.js from https://nodejs.org/

### Changes Not Showing

1. **Hard refresh browser**: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
2. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```
3. **Check if file saved**: Look for unsaved indicator in editor

### Environment Variables Not Working

1. **Restart server**: Stop (Ctrl+C) and run `npm run dev` again
2. **Check file name**: Must be exactly `.env.local`
3. **Check file location**: Must be in project root
4. **Check syntax**: No spaces around `=` sign

### User Registration Fails

1. **Check terminal for errors**
2. **Verify `data/` folder exists**
3. **Check file permissions**:
   ```bash
   chmod 755 data
   ```

### Payment Button Doesn't Work

1. **Check Stripe keys in `.env.local`**
2. **Verify keys start with `pk_test_` and `sk_test_`**
3. **Check browser console** (F12) for errors
4. **Restart server** after adding keys

## Environment Variables Explained

### Required for Development

```env
# Database - uses local file storage
DATABASE_URL="file:./dev.db"

# App URL - your local development URL
NEXTAUTH_URL="http://localhost:3000"

# Secret key - for session encryption
NEXTAUTH_SECRET="generate-with-openssl-rand"
```

**Note:** Admin users are configured in Firestore by setting `isAdmin: true` on the user document.

### Required for Payments

```env
# Stripe public key - safe to expose in browser
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Stripe secret key - NEVER expose in browser
STRIPE_SECRET_KEY="sk_test_..."

# Webhook secret - for Stripe to verify requests
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### Course Configuration

```env
# Price in cents (9900 = €99.00)
NEXT_PUBLIC_COURSE_PRICE="9900"

# Currency code (EUR, USD, GBP, etc.)
NEXT_PUBLIC_CURRENCY="EUR"
```

## Development Best Practices

### 1. Always Use Test Mode

- Use Stripe **test** keys (pk_test_, sk_test_)
- Never use live keys in development
- Test card: 4242 4242 4242 4242

### 2. Backup Your Data

```bash
# Backup users
cp data/users.json data/users.backup.json
```

### 3. Check for Errors Regularly

- Watch terminal output
- Check browser console (F12)
- Test functionality after changes

### 4. Commit Changes Often

```bash
git add .
git commit -m "Description of changes"
```

### 5. Keep Dependencies Updated

```bash
npm outdated
npm update
```

## Quick Reference Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Install dependencies
npm install

# Install specific package
npm install package-name

# Remove package
npm uninstall package-name

# Clear cache
rm -rf .next

# Check Node version
node --version

# Check npm version
npm --version

# Generate secret
openssl rand -base64 32
```

## Getting Help

### Check These First

1. **Terminal output**: Look for error messages
2. **Browser console**: Press F12, check Console tab
3. **Documentation**: Read other docs in `docs/` folder
4. **Environment file**: Verify `.env.local` is correct

### Common Error Messages

**"Module not found"**
→ Run `npm install`

**"Port already in use"**
→ Kill process or use different port

**"Cannot read property of undefined"**
→ Check if data exists before accessing it

**"Failed to fetch"**
→ Check if server is running

---

## ✅ Development Setup Complete When:

- [ ] Node.js and npm installed
- [ ] Dependencies installed (`npm install` successful)
- [ ] `.env.local` file created and configured
- [ ] `NEXTAUTH_SECRET` generated
- [ ] Server starts without errors
- [ ] Can access http://localhost:3000
- [ ] Can navigate between pages
- [ ] Can create test user account
- [ ] User data saved in `data/users.json`

**You're ready to develop! 🚀**
