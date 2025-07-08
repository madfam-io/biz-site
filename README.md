# MADFAM Corporate Website

![MADFAM](https://img.shields.io/badge/MADFAM-AI%20%2B%20Creativity-9B59B6)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![License](https://img.shields.io/badge/License-Proprietary-red)

The official corporate website for MADFAM - where AI meets human creativity. Built with Next.js 14, TypeScript, and a modern monorepo architecture.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test
```

Visit [http://localhost:3000](http://localhost:3000) to see the site.

## 📁 Project Structure

```
madfam-corporate/
├── apps/
│   ├── web/              # Next.js 14 corporate website
│   └── cms/              # Payload CMS (future)
├── packages/
│   ├── ui/               # Shared UI components
│   ├── core/             # Business logic & types
│   ├── analytics/        # Analytics integration
│   ├── i18n/             # Internationalization
│   └── email/            # Email templates (future)
├── docs/                 # Documentation
├── scripts/              # Build & deployment scripts
└── infrastructure/       # IaC configurations (future)
```

## 🎯 Key Features

### Service Tiers
- **L1 Essentials** - 3D design and graphics
- **L2 Advanced** - Parametric design
- **L3 Consulting** - Workshops & training
- **L4 Platforms** - SPARK & PENNY implementation
- **L5 Strategic** - vCTO partnerships

### Products
- **SPARK** - AI orchestration platform
- **PENNY** - Process automation tool

### Technical Features
- 🌐 Internationalization (Spanish/English)
- 📊 Privacy-first analytics with Plausible
- 🎨 Custom design system with Tailwind CSS
- 📱 Mobile-first responsive design
- 🚀 Optimized for 95+ Lighthouse scores
- 🔒 Enterprise-grade security
- 📈 Lead generation with AI scoring

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **State**: React hooks, Context API
- **Forms**: React Hook Form, Zod validation
- **Analytics**: Plausible Analytics
- **Deployment**: Vercel (production), GitHub Pages (staging)
- **CI/CD**: GitHub Actions
- **Monorepo**: Turborepo, pnpm workspaces

## 🚢 Deployment

### Staging (GitHub Pages)
```bash
git checkout staging
pnpm build:staging
# Automatic deployment via GitHub Actions
```

### Production (Vercel)
```bash
git checkout main
git tag v1.0.0
git push origin v1.0.0
# Automatic deployment via GitHub Actions
```

## 📚 Documentation

- [Architecture](./docs/ARCHITECTURE.md) - System design and technical decisions
- [API Documentation](./docs/API.md) - API endpoints and examples
- [Deployment Guide](./docs/DEPLOYMENT.md) - Detailed deployment instructions
- [Contributing](./docs/CONTRIBUTING.md) - Development guidelines
- [AI Context](./docs/CLAUDE.md) - AI assistant documentation

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run specific package tests
pnpm test --filter=@madfam/ui

# Run E2E tests
pnpm test:e2e
```

## 🌍 Environment Variables

Create a `.env.local` file in `apps/web/`:

```env
# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=madfam.io

# API
NEXT_PUBLIC_API_URL=https://api.madfam.io

# Feature Flags
NEXT_PUBLIC_ENV=development

# n8n Integration (optional)
N8N_WEBHOOK_URL=https://n8n.madfam.io/webhook/xxx
```

## 🤝 Contributing

Please read our [Contributing Guide](./docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is proprietary software. All rights reserved by MADFAM.

## 🔗 Links

- [Production Site](https://madfam.io)
- [Staging Site](https://madfam.github.io/biz-site)
- [Documentation](./docs)
- [Issues](https://github.com/madfam-io/biz-site/issues)

---

Built with ❤️ by MADFAM - Where AI meets human creativity