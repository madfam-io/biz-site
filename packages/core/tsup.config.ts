import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  external: ['zod'],
  noExternal: [/^\.\/|^\.\.\//],
  esbuildOptions(options) {
    options.bundle = true;
    options.platform = 'node';
  },
});