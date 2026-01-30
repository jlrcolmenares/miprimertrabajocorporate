# Mi Primer Trabajo Corporate

Plataforma de curso online para preparar a personas para su primer trabajo en el mundo corporativo.

**Autor:** Jose Luis Colmenares
**Contacto:** jlrcc991@hotmail.com

## Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Visita http://localhost:3000

## Comandos Disponibles

```bash
npm run dev      # Servidor de desarrollo (localhost:3000)
npm run build    # Build de producción
npm run start    # Iniciar servidor de producción
npm run lint     # Ejecutar ESLint
npm run lint:fix # Ejecutar ESLint con auto-fix
```

## Pre-commit Hook

El proyecto usa **Husky** + **lint-staged** para ejecutar ESLint automáticamente antes de cada commit.

**El hook se ejecuta automáticamente** cuando haces `git commit`. No necesitas hacer nada extra.

```bash
# Cuando haces commit, automáticamente:
git commit -m "tu mensaje"
# 1. lint-staged se ejecuta
# 2. ESLint verifica los archivos .ts/.tsx modificados
# 3. Si hay errores, el commit se bloquea
# 4. Si todo está bien, el commit procede
```

**Si necesitas reinstalar los hooks:**
```bash
npm run prepare   # Reinstala husky
```

**Si necesitas saltar el hook (no recomendado):**
```bash
git commit -m "mensaje" --no-verify
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── sobre-mi/             # Página "Sobre mí"
│   ├── curso/                # Página del curso
│   ├── login/                # Inicio de sesión
│   ├── dashboard/            # Dashboard del usuario
│   │   ├── perfil/           # Editar perfil
│   │   └── contenido/        # Contenido del curso
│   └── api/                  # API routes
├── components/
│   ├── Footer.tsx            # Footer global
│   └── CourseSidebar.tsx     # Navegación del curso
├── data/
│   ├── courseStructure.ts    # Estructura del curso
│   └── moduleContent/        # Contenido de módulos
└── lib/
    ├── firebase.ts           # Firebase client
    ├── firebase-admin.ts     # Firebase Admin SDK
    └── firestore-users.ts    # Operaciones de usuarios
```

## Flujo de Registro y Pago (Actual)

> **Nota:** Los pagos se procesan manualmente. Stripe está preparado pero deshabilitado.

1. Usuario visita `/curso` y hace clic en "Solicitar Acceso"
2. Se abre su cliente de correo con mensaje pre-llenado a jlrcc991@hotmail.com
3. Admin procesa el pago manualmente
4. Admin crea cuenta de usuario en Firebase
5. Admin envía credenciales al usuario
6. Usuario inicia sesión en `/login`

## Variables de Entorno

Crea un archivo `.env.local` con:

```env
# Firebase (obligatorio)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_SERVICE_ACCOUNT_KEY=

# Admin (opcional)
ADMIN_EMAIL=
ADMIN_PASSWORD=

# Stripe (opcional - actualmente deshabilitado)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Deploy

El proyecto está desplegado en **Vercel**.

Para hacer deploy manual:
```bash
git push origin main   # Vercel despliega automáticamente
```

## Tech Stack

- **Framework:** Next.js 15 (App Router + Turbopack)
- **Styling:** Tailwind CSS v4
- **Auth:** Firebase Authentication
- **Database:** Cloud Firestore
- **Pagos:** Manual (Stripe preparado)
- **Deploy:** Vercel
- **Pre-commit:** Husky + lint-staged

## Documentación Adicional

- `CLAUDE.md` - Guía para Claude Code
- `docs/FIREBASE_SETUP.md` - Configuración de Firebase
- `docs/LOCAL_DEVELOPMENT.md` - Desarrollo local

---

**Curso:** 8 secciones, 33 módulos
