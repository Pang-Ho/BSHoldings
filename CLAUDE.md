# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 (App Router) website for BS Holdings, a Korean company specializing in industrial sensors. The site uses:
- **React 19** with React Compiler enabled
- **TypeScript** with strict mode
- **Tailwind CSS v4** with custom CSS variables
- **shadcn/ui** components (radix-vega style)
- **pnpm** as the package manager
- **Pretendard** as the primary Korean font

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Architecture & Structure

### App Router Structure
```
src/app/
├── page.tsx          # Home page (main landing)
├── layout.tsx        # Root layout with Pretendard font
├── globals.css       # CSS variables and Tailwind imports
├── products/         # Product catalog pages
│   ├── page.tsx      # Product listing
│   └── [id]/page.tsx # Product detail pages
├── company/          # Company info page
└── location/         # Location/contact page
```

### Component Organization
- `src/components/ui/` - shadcn/ui base components (button, dropdown, tabs, navigation-menu, chip, tooltip, etc.)
- `src/components/` - Application-specific components (Header, Footer)
- `src/lib/utils.ts` - Utility functions including `cn()` for class merging and Figma token conversion utilities

### Styling System

**CSS Variables**: The project uses an extensive custom design token system defined in `globals.css`:
- Primary colors: `--color-primary-[50-900]`
- Grey scale: `--color-grey-[50-900]` with additional `350`, `750`, `850` steps
- Secondary, error, warning, success, and info color scales
- Text colors: `--color-text-[weak|default|strong]`
- Background colors: `--color-bg-[default|subtle|surface]`
- Button-specific tokens for different states and variants

**Tailwind Integration**: Use CSS variables via Tailwind classes:
```tsx
// Direct CSS variable references in className
className="text-[var(--color-text-strong)] bg-[var(--color-primary-500)]"
```

**Component Styling Pattern**: UI components use `class-variance-authority` (CVA) for variant-based styling. See [button.tsx](src/components/ui/button.tsx) for the standard pattern.

### Header Component

The [Header](src/components/header.tsx) is a complex navigation component with:
- **Transparent mode**: Pass `isTransparent={true}` for transparent backgrounds (used on hero sections)
- **Current path tracking**: Pass `currentPath` to highlight active navigation
- **Desktop mega-menu**: Multi-column dropdown for products with extensive sensor categories
- **Mobile menu**: Hamburger menu with full-screen navigation
- **Responsive phone button**: Shows company contact number

The product navigation is organized into 4 columns covering sensor categories (proximity, photo, capacitive, ultrasonic, high-temperature, level, laser, encoder, safety, OEM).

### Key Technical Details

**Next.js Config**: React Compiler is enabled via `reactCompiler: true` in [next.config.ts](next.config.ts)

**Import Aliases**:
- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks`

**Font Loading**: Pretendard variable font is loaded in layout.tsx as a local font with CSS variable `--font-pretendard`

**Client Components**: Most interactive components use `'use client'` directive (Header, page.tsx with navigation)

## UI Component Usage

### shadcn/ui Components
This project uses shadcn/ui with the **radix-vega** style variant. Components are configured in [components.json](components.json):
- Base color: neutral
- CSS variables enabled
- Icon library: lucide-react
- RSC (React Server Components) enabled

### Custom Components
- **CustomTabs**: Extended tabs component in [custom-tabs.tsx](src/components/ui/custom-tabs.tsx)
- **CustomDropdown**: Extended dropdown in [custom-dropdown.tsx](src/components/ui/custom-dropdown.tsx)
- **Chip/ChipGroup**: Tag-like components for categorization
- **NavigationMenu**: Complex multi-level navigation with mega-menu support

### Component Variants
Use the CVA pattern for new component variants:
```tsx
const componentVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", outline: "..." },
    size: { default: "...", sm: "...", lg: "..." }
  },
  defaultVariants: { variant: "default", size: "default" }
});
```

## Working with the Design System

### Adding New Colors
Add CSS variables to `globals.css` following the existing token naming convention. Design tokens are organized by:
1. Base colors (primary, secondary, grey, error, warning, success, info)
2. Semantic colors (text, background, border)
3. Component-specific tokens (button, input, etc.)

### Figma Token Conversion
The `extractCssColorVariables()` function in [utils.ts](src/lib/utils.ts#L30-L65) converts Figma design tokens to CSS variables. It processes Figma color tokens and generates CSS variable declarations.

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- `lg:` prefix for desktop (Header switches layout at `lg` breakpoint)
- Components should support both mobile and desktop layouts

## Important Conventions

1. **Korean Language**: All UI text is in Korean. Maintain this when adding features.
2. **CSS Variables**: Use `var(--color-*)` pattern consistently, not Tailwind color utilities
3. **File Naming**: Use kebab-case for files (e.g., `navigation-menu.tsx`)
4. **Component Exports**: Named exports for components, not default exports (except page.tsx/layout.tsx)
5. **Client Directives**: Add `'use client'` only when needed (state, effects, event handlers, browser APIs)
