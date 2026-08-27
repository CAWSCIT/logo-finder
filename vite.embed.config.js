import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*
 * Builds the drop-in widget: a single, self-contained `build.js` that any site
 * can load with one <script> tag.
 *
 *   <div id="ca-logo-app"></div>
 *   <script src="https://cawscit.github.io/logo-finder/build.js"></script>
 *
 * It writes into the same `dist/` the main site build produces (with
 * emptyOutDir off, so it must run *after* `vite build`), which puts it on
 * GitHub Pages next to the img/ and pdf/ folders it loads from.
 *
 * CSS is imported with `?inline` and injected into a Shadow DOM at runtime, so
 * no separate stylesheet is emitted and nothing leaks into the host page.
 */
export default defineConfig({
  plugins: [react()],
  define: {
    // React reads this; a lib build has no HTML entry to set the mode for us.
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: 'src/embed/embed.jsx',
      name: 'CALogoApp',
      formats: ['iife'],
      fileName: () => 'build.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        // Keep the filename stable -- it's a public URL people paste into pages.
        entryFileNames: 'build.js',
      },
    },
  },
})
