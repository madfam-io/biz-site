# CMS Build Optimization

This document explains the optimization strategies implemented to keep generated build files under 800 lines.

## Problem

The Payload CMS build process generates large CSS files (800+ lines) that exceed our codebase standards.

## Solution

### 1. Webpack Configuration (`webpack.config.js`)

- **CSS Minification**: Aggressive minification with comment removal and whitespace normalization
- **Code Splitting**: Automatic splitting of CSS into chunks at ~30KB (≈750 lines)
- **Chunk Optimization**: Dynamic naming with content hashes for caching

### 2. Build Process Integration

The webpack configuration is integrated into `payload.config.ts`:

```typescript
bundler: webpackBundler({
  webpack: config => {
    // Merge optimized configuration
    const optimizedConfig = require('./webpack.config.js');
    // ... configuration merging
  },
});
```

### 3. Expected Output

Instead of a single 800+ line CSS file:

```
styles.99f26a0fcdaccf8241d7.css (891 lines)
```

The build will generate multiple smaller chunks:

```
styles.a1b2c3d4.css (400 lines)
styles.e5f6g7h8.chunk.css (350 lines)
styles.i9j0k1l2.chunk.css (200 lines)
```

### 4. Installation

Install required dependencies:

```bash
pnpm add -D css-minimizer-webpack-plugin mini-css-extract-plugin
```

### 5. Build Commands

- **Development**: `pnpm dev` (unoptimized, faster builds)
- **Production**: `pnpm build` (optimized, smaller files)

### 6. Verification

After building, verify no single CSS file exceeds 800 lines:

```bash
find build -name "*.css" -exec wc -l {} + | sort -nr
```

## Benefits

1. **Maintainability**: No single file exceeds 800 lines
2. **Performance**: Better caching with chunked files
3. **Scalability**: Automatic splitting as CSS grows
4. **Standards**: Consistent with project file size guidelines

## Notes

- This optimization only affects **generated** build files
- Source files remain unchanged
- Build process may take slightly longer due to optimization
- Generated files are excluded from manual editing

---

_Last updated: 2025-08-28_
