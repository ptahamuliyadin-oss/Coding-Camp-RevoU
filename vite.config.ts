/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// CSS Modules are enabled by default in Vite for any file that matches the
// `*.module.css` naming convention. Importing such a file yields a
// `Record<string, string>` of locally-scoped class names.
// See: https://vitejs.dev/guide/features.html#css-modules
//
// The configuration below makes the convention explicit so the behaviour is
// self-documenting and easy to adjust later (e.g. customising the generated
// class name pattern for production builds).
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // Keep readable, locally-scoped class names in both dev and prod.
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
  test: {
    // jsdom environment enables DOM APIs for component testing.
    environment: 'jsdom',
    // Inject describe/it/expect/etc. as globals so test files need no imports.
    globals: true,
    // Runs once before the test suite: registers jest-dom matchers and
    // configures fast-check global settings.
    setupFiles: ['./src/test/setup.ts'],
  },
})
