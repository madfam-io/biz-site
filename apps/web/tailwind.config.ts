/**
 * NOTHING IN THIS FILE IS READ. Verified 2026-08-14 by compiling `globals.css`
 * through `@tailwindcss/postcss` and grepping the output.
 *
 * Tailwind v4 does not auto-discover a JS/TS config. It loads one only when a
 * stylesheet asks for it with `@config`, and no stylesheet in this repo does —
 * `grep -rn "@config" apps packages` returns nothing. `app/globals.css` starts
 * at `@import "tailwindcss";`, so `darkMode`, `content`, `theme.extend` and
 * `plugins` below are all inert.
 *
 * How that was proved, rather than reasoned about — compile `globals.css` and
 * look for utilities that exist ONLY here:
 *
 *     .prose            (registered via @plugin in globals.css)  -> emitted
 *     --color-sun       (declared in @theme in globals.css)      -> emitted
 *     .font-heading     (only in this file)                      -> NOT emitted
 *     .text-brand-green (only in this file)                      -> NOT emitted
 *     .animate-fade-up  (only in this file)                      -> NOT emitted
 *
 * The `plugins` array cost us `prose`: /es/privacy and /es/terms used correct
 * semantic markup and rendered as an undifferentiated wall of text, because the
 * typography plugin was loaded by nobody. #271 fixed that by moving plugin
 * registration into `globals.css`. The rest of this file has the same defect and
 * has not been migrated.
 *
 * STILL OUTSTANDING, and the reason this file is annotated rather than deleted:
 * `font-heading` is used in 16 files, `text-brand-green` in 2 and
 * `animate-fade-up` in 1, and every one of them currently emits no CSS. The
 * values below are the record of what those utilities are meant to be. Migrating
 * them into `@theme` / `@utility` in `globals.css` is a visual change that wants
 * reviewing on its own; deleting this file first would throw the record away.
 *
 * DO NOT add anything here expecting it to take effect. Design tokens go in the
 * `@theme` block in `app/globals.css`; plugins go in `@plugin` lines beside it.
 */
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors - Single Source of Truth (from packages/ui/src/themes/brand-colors.ts)
        brand: {
          green: 'var(--logo-green)',
          'green-light': '#52b788',
          'green-dark': '#1e5128',
          purple: 'var(--logo-purple)',
          'purple-light': '#7d4f96',
          'purple-dark': '#3d1e4f',
          yellow: 'var(--logo-yellow)',
          'yellow-light': '#f7d64a',
          'yellow-dark': '#d4a20d',
        },
        // Legacy Creative Colors
        sun: '#FFD93D',
        leaf: '#6BCB77',
        lavender: '#9B59B6',
        obsidian: '#0A0E27',
        pearl: '#FAFAFA',
        // Semantic colors
        primary: 'var(--color-obsidian)',
        secondary: 'var(--color-sun)',
        success: 'var(--color-leaf)',
        creative: 'var(--color-lavender)',
        surface: 'var(--color-pearl)',
      },
      blur: {
        'brand-xl': '96px',
        'brand-2xl': '100px',
        'brand-3xl': '128px',
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      fontSize: {
        'display-xl': 'clamp(3rem, 5vw, 5rem)',
        display: 'clamp(2.5rem, 4vw, 4rem)',
        'heading-1': 'clamp(2rem, 3vw, 3rem)',
        'heading-2': 'clamp(1.5rem, 2.5vw, 2.5rem)',
        'heading-3': 'clamp(1.25rem, 2vw, 2rem)',
        'body-lg': 'clamp(1.125rem, 1.5vw, 1.25rem)',
      },
      spacing: {
        section: 'clamp(3rem, 8vw, 6rem)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.5s ease-out',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-brand':
          'linear-gradient(135deg, var(--color-obsidian) 0%, var(--color-lavender) 100%)',
        'mesh-gradient': `
          radial-gradient(at 40% 20%, var(--color-sun) 0px, transparent 50%),
          radial-gradient(at 80% 0%, var(--color-lavender) 0px, transparent 50%),
          radial-gradient(at 0% 50%, var(--color-leaf) 0px, transparent 50%),
          radial-gradient(at 80% 50%, var(--color-obsidian) 0px, transparent 50%),
          radial-gradient(at 0% 100%, var(--color-sun) 0px, transparent 50%)
        `,
      },
    },
  },
  // DEAD under v4 — the live registration is `@plugin` in `app/globals.css`.
  // These three were installed, listed here, and loaded by nobody until #271.
  // Adding a fourth here would repeat that; add it to `globals.css` instead.
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
};

export default config;
