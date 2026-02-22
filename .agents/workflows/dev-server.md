---
description: Start the Next.js dev server and verify changes in browser
---

# Dev Server

// turbo-all

## Steps

1. **Start the development server**:

   ```bash
   pnpm dev
   ```

2. **Open in browser** at `http://localhost:3000`

3. **Verify changes**:
   - Check the page loads without errors
   - Verify hot module replacement (HMR) works
   - Check browser console for warnings or errors

4. **Test responsiveness**:
   - Resize browser to mobile width (375px)
   - Check tablet width (768px)
   - Check desktop width (1440px)

5. **Test dark/light mode** (if theme toggle exists):
   - Toggle between themes
   - Verify all components adapt correctly
