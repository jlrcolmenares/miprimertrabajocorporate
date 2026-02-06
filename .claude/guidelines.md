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

// With variants
<button className={cn(
  "px-4 py-2 rounded-md",
  variant === "primary" && "bg-blue-600 text-white",
  variant === "secondary" && "bg-gray-200 text-gray-800",
  disabled && "opacity-50 cursor-not-allowed"
)} />
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

### CSS Variables (defined in globals.css)

```css
/* Project colors */
--primary: #2563eb;
--primary-hover: #1d4ed8;
--primary-light: #dbeafe;

/* Section colors (0-7) */
--section-0 through --section-7

/* shadcn variables */
--background, --foreground, --card, --popover, --muted, --accent, --destructive, --border, --input, --ring
```

### Color Palette

| Use Case | Color | Tailwind Class |
|----------|-------|----------------|
| Primary actions | Blue | `bg-blue-600`, `text-blue-600` |
| Success/Completed | Green | `bg-green-500`, `text-green-600` |
| Admin accent | Amber | `bg-amber-500`, `text-amber-600` |
| Backgrounds | Gray | `bg-gray-50`, `bg-gray-100` |
| Destructive | Red | `bg-destructive` or `bg-red-600` |

### Existing CSS Classes (globals.css)

Use these instead of creating new ones:

```css
/* Landing page */
.landing-gradient-bg    /* Animated gradient background */
.glass-card             /* Frosted glass effect */
.gradient-text          /* Gradient text effect */
.btn-gradient           /* Gradient button with hover effects */
.btn-outline-glass      /* Glass outline button */
.feature-card           /* Card with hover animations */

/* Animations */
.floating-element       /* Float animation */
.glow-pulse            /* Pulsing glow effect */

/* Module content */
.module-content        /* Wrapper for module text content */
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
{isCompleted && <CheckIcon className="text-green-500" />}
{!isCompleted && <span className="text-gray-400">Pendiente</span>}
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
