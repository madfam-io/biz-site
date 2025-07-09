import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['zod'],
  esbuildOptions(options) {
    options.bundle = true;
    options.format = options.format === 'esm' ? 'esm' : 'cjs';
  },
});