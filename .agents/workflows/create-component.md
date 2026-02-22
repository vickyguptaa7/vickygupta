---
description: Create a new reusable component end-to-end
---

# Create Component

// turbo-all

## Steps

1. **Decide location** based on component type:
   - Shared/reusable → `src/components/common/`
   - shadcn primitive → `src/components/ui/` (use `pnpm dlx shadcn@latest add <name>`)
   - Section-specific → `src/components/sections/{section}/`

2. **Create the component file** using kebab-case naming:

   ```bash
   touch src/components/common/{component-name}.tsx
   ```

3. **Scaffold the component** following this structure:
   - `"use client"` directive (only if hooks/events are used)
   - External imports (React, Motion, react-icons)
   - Internal imports (`cn`, other components)
   - `interface {Name}Props` with typed props
   - Named export `function {Name}()`
   - Accept and merge `className` via `cn()`

4. **Add styling**:
   - Use Tailwind CSS classes as primary styling
   - Use `cn()` for conditional/variant classes
   - If complex animations or pseudo-elements are needed, create `{component-name}.module.css` alongside

5. **Add animations** (if applicable):
   - Import from `motion/react`
   - Use presets from `src/constants/animation-presets.ts`
   - Respect `prefers-reduced-motion`

6. **Verify**:
   - Run `pnpm dev` and check the component renders correctly
   - Test at mobile and desktop breakpoints
   - Verify dark mode appearance
