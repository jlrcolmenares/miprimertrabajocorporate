# 🎓 Mi Primer Trabajo Corporate - Course Platform

A complete, production-ready web application for selling your Spanish course "Mi Primer Trabajo Corporate" with integrated payment processing and user management.

## ✨ Features

- 🎨 **Beautiful Landing Page** with call-to-action
- 👤 **User Authentication** (register/login)
- 💳 **Stripe Payment Integration** for course purchases
- 📚 **Protected Course Content** (7 modules)
- 🔐 **User Dashboard** with profile management
- 📱 **Fully Responsive** design
- 🇪🇸 **Spanish Language** interface
- ⚡ **Built with Next.js 15** and Tailwind CSS

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up Firebase (REQUIRED - see docs/FIREBASE_SETUP.md)

# 3. Create .env.local file with Firebase credentials

# 4. Start development server
npm run dev
```

Visit http://localhost:3000

**⚠️ IMPORTANT: You MUST set up Firebase first!**
**👉 See [docs/FIREBASE_SETUP.md](./docs/FIREBASE_SETUP.md) for Firebase setup**
**👉 See [docs/LOCAL_DEVELOPMENT.md](./docs/LOCAL_DEVELOPMENT.md) for detailed instructions**

## 📖 Documentation

**👉 Start here: [docs/README.md](./docs/README.md)** - Complete documentation index

Quick links:
- **[FIREBASE_SETUP.md](./docs/FIREBASE_SETUP.md)** - Firebase Authentication & Firestore setup (REQUIRED)
- **[LOCAL_DEVELOPMENT.md](./docs/LOCAL_DEVELOPMENT.md)** - Local setup and environment guide
- **[NEXT_STEPS.md](./docs/NEXT_STEPS.md)** - What to do after setup
- **[TECHNICAL_REFERENCE.md](./docs/TECHNICAL_REFERENCE.md)** - Architecture and technical decisions

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── sobre-mi/                   # About me page
│   ├── curso/                      # Course page with payment
│   ├── login/                      # Authentication
│   ├── success/                    # Payment success
│   ├── dashboard/                  # User dashboard
│   │   ├── perfil/                # Profile management
│   │   └── contenido/[moduleId]/  # Course content
│   └── api/
│       ├── auth/                   # Auth endpoints
│       └── create-checkout-session/ # Stripe checkout
└── lib/
    └── users.ts                    # User management
```

## 🎯 Key Pages

| Page | URL | Description |
|------|-----|-------------|
| Landing | `/` | Homepage with CTA |
| About | `/sobre-mi` | Your bio and story |
| Course | `/curso` | Course details & purchase |
| Login | `/login` | Authentication |
| Dashboard | `/dashboard` | User dashboard |
| Profile | `/dashboard/perfil` | Edit profile |
| Content | `/dashboard/contenido/[1-7]` | Course modules |

## 💳 Payment Flow

1. User visits course page
2. Clicks "Comprar Ahora"
3. Redirected to Stripe Checkout
4. Completes payment
5. Redirected to success page
6. Gets access to course content

## 🔧 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Payments**: Stripe
- **Authentication**: Firebase Authentication
- **Database**: Cloud Firestore
- **Language**: TypeScript
- **Deployment**: Vercel / AWS Lightsail / Netlify

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Deployment

**Recommended:** Vercel (easiest for Next.js)

See [docs/TECHNICAL_REFERENCE.md](./docs/TECHNICAL_REFERENCE.md) for detailed deployment instructions for Vercel, AWS Lightsail, and other platforms.

## 🔐 Security Notes

- Passwords are hashed with SHA-256
- Environment variables for sensitive data
- Protected API routes
- Content access control
- HTTPS required in production

## 📝 Customization

### Change Course Price
Edit `.env.local`:
```env
NEXT_PUBLIC_COURSE_PRICE="14900"  # €149.00 (in cents)
```

### Update Content
- **About page**: `src/app/sobre-mi/page.tsx`
- **Course modules**: `src/app/dashboard/contenido/[moduleId]/page.tsx`
- **Landing page**: `src/app/page.tsx`

### Change Colors
Search and replace `indigo-600` with your preferred Tailwind color.

## 🐛 Troubleshooting

See [docs/LOCAL_DEVELOPMENT.md](./docs/LOCAL_DEVELOPMENT.md) for detailed troubleshooting steps.

## 📦 Dependencies

- next: ^15.5.6
- react: ^19
- stripe: Latest
- tailwindcss: ^3
- typescript: ^5

## 📄 License

This project is private and proprietary.

## 🤝 Support

For issues or questions, check the documentation files or review the code comments.

---

**Built with ❤️ for your course success!**
