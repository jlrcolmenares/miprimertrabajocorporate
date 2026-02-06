# Frontend Development Guidelines

This document provides guidance for frontend development in this project.

## Component Organization

```
src/components/
├── ui/                  # Base UI components (from shadcn/ui)
│   ├── button.tsx       # Button with variants
│   └── input.tsx        # Styled input
├── course/              # Course-specific components
│   ├── CourseSidebar.tsx
│   ├── CourseSection.tsx
│   └── ModuleCard.tsx
├── CelebrationModal.tsx # General-purpose modal
├── Footer.tsx           # Layout component
└── PaymentButton.tsx    # Feature-specific
```

### Where to place new components:

| Type | Location | Examples |
|------|----------|----------|
| Base UI primitives | `ui/` | Button, Input, Dialog, Card |
| Course-related | `course/` | Module components, progress indicators |
| Layout | Root `components/` | Header, Footer, Sidebar |
| Feature-specific | Root `components/` | PaymentButton, CelebrationModal |

## Using shadcn/ui

### Adding new components

```bash
npx shadcn@latest add [component-name]
```

Common components to add as needed:
- `card` - for content containers
- `dialog` - for modals
- `dropdown-menu` - for menus
- `toast` - for notifications
- `form` - for form handling with react-hook-form

### The `cn()` utility

Use `cn()` from `@/lib/utils` to conditionally combine Tailwind classes:

```tsx
import { cn } from "@/lib/utils";

// Basic usage
<div className={cn("base-classes", conditional && "conditional-classes")} />

// With variants (use for layout/sizing, not colors)
<button className={cn(
  "px-4 py-2 rounded-md text-white",
  disabled && "opacity-50 cursor-not-allowed"
)} />

// Colors should use inline styles with CSS variables
<button
  className={cn("px-4 py-2 rounded-md text-white", disabled && "opacity-50")}
  style={{ backgroundColor: 'var(--primary)' }}
/>
```

### Using the Button component

```tsx
import { Button } from "@/components/ui/button";

// Variants: default, destructive, outline, secondary, ghost, link
<Button variant="default">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="ghost">Subtle Action</Button>

// Sizes: default, xs, sm, lg, icon, icon-xs, icon-sm, icon-lg
<Button size="sm">Small Button</Button>
<Button size="icon"><IconComponent /></Button>
```

### Using the Input component

```tsx
import { Input } from "@/components/ui/input";

<Input type="email" placeholder="correo@ejemplo.com" />
<Input type="password" className="w-full" />
```

## Styling Conventions

### Brand Color Palette (MANDATORY)

**IMPORTANT:** Only use the approved brand colors defined below. Do NOT use arbitrary Tailwind color classes (like `bg-blue-600`, `text-indigo-500`, etc.) outside of this palette.

#### Primary Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Primary (Dark Indigo) | `#292C88` | `var(--primary)` | Buttons, links, headings, accents |
| Primary Hover | `#1e2066` | `var(--primary-hover)` | Hover states for primary elements |
| Primary Light | `#4a4da8` | `var(--primary-light)` | Lighter shade, gradients |
| Primary 50 | `#eef0ff` | `var(--primary-50)` | Very light tints, subtle backgrounds |
| Primary 100 | `#d8dafe` | `var(--primary-100)` | Light tints |

#### Secondary Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Secondary (Gold) | `#EDD278` | `var(--secondary-brand)` | Highlights, badges, special accents |
| Secondary Hover | `#e5c55a` | `var(--secondary-hover)` | Hover states |
| Secondary Light | `#f5e4a8` | `var(--secondary-light)` | Lighter shade |

#### Background & Accent Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Background | `#E8E9EB` | `var(--background-brand)` | Page backgrounds |
| Background White | `#ffffff` | `var(--background-white)` | Cards, modals |
| Accent (Light Blue) | `#DBEAFE` | `var(--accent-brand)` | Highlights, active states |

#### Neutral Colors (allowed)

For text and UI elements, use standard gray shades:
- `text-gray-900`, `text-gray-700`, `text-gray-600`, `text-gray-500` - Text colors
- `bg-gray-100`, `bg-gray-200` - Subtle backgrounds
- `border-gray-200`, `border-gray-300` - Borders

#### Status Colors (allowed)

- **Success:** `text-green-500`, `bg-green-100`, `text-green-700` - Completed states
- **Error:** `text-red-600`, `bg-red-100` - Error messages (rare use)

### How to Apply Brand Colors

**ALWAYS use inline styles with CSS variables instead of Tailwind color classes:**

```tsx
// ✅ CORRECT - Using CSS variables
<button style={{ backgroundColor: 'var(--primary)' }}>
  Click me
</button>

<div style={{ backgroundColor: 'var(--background-brand)' }}>
  Content
</div>

<span style={{ color: 'var(--primary)' }}>
  Link text
</span>

// ❌ WRONG - Using Tailwind color classes
<button className="bg-blue-600">Click me</button>
<div className="bg-indigo-50">Content</div>
```

**For hover effects, use event handlers:**

```tsx
<button
  style={{ backgroundColor: 'var(--primary)' }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
>
  Hover me
</button>
```

**For focus rings on inputs:**

```tsx
<input
  className="focus:ring-2 focus:border-transparent"
  style={{ '--tw-ring-color': 'var(--primary)' } as React.CSSProperties}
/>
```

### CSS Variables in globals.css

All brand colors are defined in `:root` in `globals.css`. Reference them with `var(--variable-name)`.

### Existing CSS Classes (globals.css)

Use these instead of creating new ones:

```css
/* Landing page */
.landing-gradient-bg    /* Animated gradient background (uses brand colors) */
.glass-card             /* Frosted glass effect */
.gradient-text          /* Gradient text effect (uses brand colors) */
.btn-gradient           /* Gradient button with hover effects (uses brand colors) */
.btn-outline-glass      /* Glass outline button */
.feature-card           /* Card with hover animations */

/* Navigation */
.nav-link-hover         /* Hover effect using brand primary color */

/* Animations */
.floating-element       /* Float animation */
.glow-pulse            /* Pulsing glow effect */

/* Module content */
.module-content        /* Wrapper for module text content (borders use brand colors) */
```

## Best Practices

### 1. Prefer editing over creating
- Edit existing components before creating new ones
- Use shadcn components as base, customize with `cn()`

### 2. Keep components focused
- One responsibility per component
- Extract repeated patterns into reusable components only when used 3+ times

### 3. Use TypeScript interfaces
```tsx
interface ComponentProps {
  title: string;
  isActive?: boolean;
  onAction: () => void;
}
```

### 4. Client components
- Add `"use client"` only when needed (hooks, event handlers, browser APIs)
- Keep server components when possible for better performance

### 5. Imports
```tsx
// Preferred import order
import { useState, useEffect } from "react";        // React
import { useRouter } from "next/navigation";        // Next.js
import { cn } from "@/lib/utils";                   // Utilities
import { Button } from "@/components/ui/button";    // UI components
import CourseSidebar from "@/components/course/CourseSidebar"; // Feature components
import { courseStructure } from "@/data/courseStructure";      // Data
```

### 6. Responsive design
- Mobile-first approach
- Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Test on mobile viewport (375px) and desktop (1280px+)

### 7. Accessibility
- Use semantic HTML (`button`, `nav`, `main`, `section`)
- Include `aria-label` for icon-only buttons
- Respect `prefers-reduced-motion` (already configured in globals.css)

## Common Patterns

### Loading states
```tsx
const [loading, setLoading] = useState(false);

<Button disabled={loading}>
  {loading ? "Cargando..." : "Enviar"}
</Button>
```

### Conditional rendering
```tsx
// Status colors (green for success) are allowed
{isCompleted && <CheckIcon className="text-green-500" />}
{!isCompleted && <span className="text-gray-400">Pendiente</span>}

// For brand colors, use inline styles
{isActive && <span style={{ color: 'var(--primary)' }}>Activo</span>}
```

### Form handling
```tsx
// Use react-hook-form for complex forms
import { useForm } from "react-hook-form";

const { register, handleSubmit, formState: { errors } } = useForm();
```

## Adding New shadcn Components

When the project needs a new base component:

1. Check if shadcn has it: https://ui.shadcn.com/docs/components
2. Install: `npx shadcn@latest add [name]`
3. Component appears in `src/components/ui/`
4. Customize with `cn()` as needed

Commonly needed components not yet installed:
- `card` - Content containers
- `dialog` - Modals (could replace CelebrationModal pattern)
- `select` - Dropdown selects
- `textarea` - Multi-line input
- `label` - Form labels
- `toast` / `sonner` - Notifications
