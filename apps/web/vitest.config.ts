import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        '.next/',
        'coverage/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData/*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@/lib': path.resolve(__dirname, './lib'),
      '@/components': path.resolve(__dirname, './components'),
      '@/app': path.resolve(__dirname, './app'),
      '@/hooks': path.resolve(__dirname, './hooks'),
      '@/styles': path.resolve(__dirname, './styles'),
      '@madfam/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@madfam/core': path.resolve(__dirname, '../../packages/core/src'),
      '@madfam/analytics': path.resolve(__dirname, '../../packages/analytics/src'),
      '@madfam/i18n': path.resolve(__dirname, '../../packages/i18n/src'),
      '@madfam/email': path.resolve(__dirname, '../../packages/email/src'),
    },
  },
});
