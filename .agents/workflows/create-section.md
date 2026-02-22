---
description: Add a new portfolio section with data, component, and animations
---

# Create Section

// turbo-all

## Steps

1. **Define section data** in `src/constants/{section-name}.ts`:
   - Create typed interfaces for the section's data shape
   - Export a `const` with the section content
   - Use `satisfies` for type-safe constant data

2. **Create section directory**:

   ```bash
   mkdir -p src/components/sections/{section-name}
   ```

3. **Create the main section component** at `src/components/sections/{section-name}/{section-name}-section.tsx`:
   - Import section data from constants
   - Use `SectionWrapper` for consistent padding and heading
   - Add `id` prop for anchor navigation

4. **Create sub-components** as needed (cards, list items, etc.) in the same directory.

5. **Add scroll animations**:
   - Import presets from `src/constants/animation-presets.ts`
   - Use `whileInView` with `viewport={{ once: true }}`
   - Add staggered reveals for lists/grids

6. **Wire into the page** in `src/app/page.tsx`:
   - Import the section component
   - Add it in the correct order (Hero → About → Projects → Experience → Contact)

7. **Add navigation anchor** in `src/constants/navigation.ts`:

   ```ts
   { label: "Section Name", href: "#section-id" }
   ```

8. **Verify**:
   - Run `pnpm dev`
   - Check scroll-to-section works from navigation
   - Verify responsive layout at all breakpoints
   - Confirm animations trigger correctly
