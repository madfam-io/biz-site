import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  external: ['zod'],
  treeshake: true,
  target: 'es2022',
  esbuildOptions(options) {
    options.resolveExtensions = ['.ts', '.js'];
  },
});