# Mi Primer Trabajo Corporate

**Version 1.0.0** | Plataforma de curso online para preparar a personas para su primer trabajo en el mundo corporativo.

**Autor:** Jose Luis Colmenares (jlrcolmenares)

## Inicio Rapido

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
npm run build    # Build de produccion
npm run start    # Iniciar servidor de produccion
npm run lint     # Ejecutar ESLint
npm run lint:fix # Ejecutar ESLint con auto-fix
```

## Estructura del Dashboard (v1.0.0)

El dashboard tiene tres experiencias distintas segun el tipo de usuario:

| Ruta | Tipo de Usuario | Descripcion |
|------|-----------------|-------------|
| `/dashboard` | Todos | Router que redirige segun tipo de usuario |
| `/dashboard/course` | Pagados + Admin | Curso completo con sidebar y progreso |
| `/dashboard/preview` | No pagados | Vista previa de secciones + boton "Solicitar Acceso" |
| `/dashboard/admin` | Solo Admin | Panel de gestion de usuarios |

## Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── sobre-mi/             # Pagina "Sobre mi"
│   ├── curso/                # Pagina del curso
│   ├── login/                # Inicio de sesion
│   ├── register/             # Registro (via invitacion)
│   ├── dashboard/
│   │   ├── page.tsx          # Router del dashboard
│   │   ├── course/           # Dashboard para usuarios pagados
│   │   ├── preview/          # Preview para usuarios no pagados
│   │   ├── admin/            # Panel de administracion
│   │   ├── perfil/           # Editar perfil
│   │   └── contenido/        # Contenido del curso
│   └── api/                  # API routes
├── components/
│   ├── Footer.tsx            # Footer global
│   └── CourseSidebar.tsx     # Navegacion del curso
├── data/
│   ├── courseStructure.ts    # Estructura del curso
│   └── moduleContent/        # Contenido de modulos
└── lib/
    ├── firebase.ts           # Firebase client
    ├── firebase-admin.ts     # Firebase Admin SDK
    ├── firestore-users.ts    # Operaciones de usuarios
    └── admin-config.ts       # Validacion de admin
```

## Flujo de Usuarios

### Flujo del Admin (Invitacion y Activacion)

1. Admin va a `/dashboard/admin`
2. Admin introduce email en "Invitar Usuario" y envia
3. Se abre cliente de correo con invitacion a `/register`
4. Usuario recibe email y crea cuenta
5. Admin ve nuevo usuario en panel (hasPaid: false)
6. Admin hace clic en "Marcar Pagado" tras recibir pago
7. Usuario cierra sesion y vuelve a entrar para tener acceso

### Flujo de Usuario Pagado

1. Usuario inicia sesion en `/login`
2. Redirigido a `/dashboard/course`
3. Ve progreso, tarjeta "Continuar Aprendiendo" y contenido
4. Navega modulos via sidebar

### Flujo de Usuario No Pagado

1. Usuario inicia sesion en `/login`
2. Redirigido a `/dashboard/preview`
3. Ve solo titulos de secciones (sin enlaces a modulos)
4. Boton "Solicitar Acceso" abre email para pedir acceso

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

# Stripe (opcional - actualmente deshabilitado)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Configuracion de Admin

El estado de admin se almacena en Firestore, no en variables de entorno.

**Para hacer un usuario administrador:**
1. Ve a Firebase Console > Firestore Database
2. Encuentra el documento del usuario en la coleccion `users`
3. Agrega el campo `isAdmin: true`
4. El usuario debe cerrar sesion y volver a entrar

## Pre-commit Hook

El proyecto usa **Husky** + **lint-staged** para ejecutar ESLint automaticamente antes de cada commit.

```bash
# Si necesitas reinstalar los hooks:
npm run prepare

# Si necesitas saltar el hook (no recomendado):
git commit -m "mensaje" --no-verify
```

## Deploy

El proyecto esta desplegado en **Vercel** (auto-deploy en push a main).

```bash
git push origin main   # Vercel despliega automaticamente
```

## Tech Stack

- **Framework:** Next.js 15 (App Router + Turbopack)
- **Styling:** Tailwind CSS v4
- **Auth:** Firebase Authentication
- **Database:** Cloud Firestore
- **Pagos:** Manual (Stripe preparado)
- **Deploy:** Vercel
- **Pre-commit:** Husky + lint-staged

## Documentacion Adicional

- `CLAUDE.md` - Guia completa para Claude Code
- `docs/FIREBASE_SETUP.md` - Configuracion de Firebase
- `docs/LOCAL_DEVELOPMENT.md` - Desarrollo local

---

**Curso:** 8 secciones, 33 modulos

**Version:** 1.0.0 (Enero 2026)
