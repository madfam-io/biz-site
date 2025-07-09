# Local Development Guide

## Quick Start

### Without Docker (Recommended for development)

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
# or
make dev

# Access at http://localhost:3000
```

### With Docker

```bash
# Development with hot reload
make docker-dev
# Access at http://localhost:3001

# Production build
make local-prod
# Access at http://localhost:3000
```

## Available Commands

Run `make help` to see all available commands:

- `make install` - Install dependencies
- `make dev` - Run development server locally
- `make build` - Build the web app
- `make start` - Start production server locally
- `make docker-build` - Build Docker images
- `make docker-up` - Start production Docker containers
- `make docker-down` - Stop all Docker containers
- `make docker-dev` - Start development Docker container with hot reload
- `make local-prod` - Build and run production locally via Docker
- `make local-dev` - Run development server via Docker

## URLs

- **Local Development**: http://localhost:3000
- **Docker Development**: http://localhost:3001
- **Docker Production**: http://localhost:3000

## Environment Variables

Create a `.env.local` file in `apps/web/`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ENV=development

# Analytics (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=

# Database (if needed)
DATABASE_URL=
```

## Docker Configuration

### Development Container
- Hot reload enabled
- Source code mounted as volumes
- Runs on port 3001
- Node modules are preserved in containers

### Production Container
- Optimized multi-stage build
- Standalone Next.js output
- Runs on port 3000
- Non-root user for security

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Docker Build Issues
```bash
# Clean everything and rebuild
make clean
make docker-build
```

### Module Resolution Issues
```bash
# Clear turbo cache
rm -rf .turbo

# Reinstall dependencies
pnpm install --force
```

## Testing Different Environments

### Local Development
```bash
NEXT_PUBLIC_ENV=development pnpm dev
```

### Local Staging
```bash
NEXT_PUBLIC_ENV=staging pnpm build && pnpm start
```

### Local Production
```bash
NEXT_PUBLIC_ENV=production pnpm build && pnpm start
```