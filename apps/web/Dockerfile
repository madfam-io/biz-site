# Base stage for dependencies
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /app

# Dependencies stage
FROM base AS deps
# Copy root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
# Copy package.json files preserving directory structure
COPY apps/web/package.json ./apps/web/
COPY apps/cms/package.json ./apps/cms/
COPY packages/analytics/package.json ./packages/analytics/
COPY packages/core/package.json ./packages/core/
COPY packages/email/package.json ./packages/email/
COPY packages/i18n/package.json ./packages/i18n/
COPY packages/ui/package.json ./packages/ui/
# Install dependencies.
# The lockfile requires @janua/nextjs and @janua/ui from npm.madfam.io, so the
# build needs the registry token. It arrives as a BuildKit secret, never as an
# ARG or ENV: an ARG is readable in `docker history` and in the image config.
# The _authToken line is appended and removed inside a single RUN, so it is
# never committed to a layer. Builds without the secret still work for the
# public subset of the tree.
RUN --mount=type=secret,id=npm_token \
    set -eu; \
    if [ -s /run/secrets/npm_token ]; then \
      printf '\n//npm.madfam.io/:_authToken=%s\n' "$(cat /run/secrets/npm_token)" >> .npmrc; \
    fi; \
    pnpm install --frozen-lockfile; \
    sed -i '/_authToken=/d' .npmrc

# Builder stage
FROM base AS builder
WORKDIR /app
# Copy installed dependencies from deps stage
COPY --from=deps /app/ ./
# Copy source code on top
COPY . .
# Generate Prisma client
RUN cd apps/web && npx prisma generate || echo "Prisma generation skipped"
# Build-time env vars required by Janua auth (NEXT_PUBLIC_* are baked at build time)
ARG NEXT_PUBLIC_JANUA_URL=https://auth.madfam.io
ENV NEXT_PUBLIC_JANUA_URL=${NEXT_PUBLIC_JANUA_URL}
# Build the web app
RUN pnpm turbo build --filter=@madfam/web

# Runner stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/server.js"]
