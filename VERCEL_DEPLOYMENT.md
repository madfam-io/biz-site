# Vercel Deployment Configuration

This monorepo requires specific configuration for successful Vercel deployment.

## Issue: "No Next.js version detected"

This error occurs because Vercel looks for Next.js in the root `package.json`, but in our monorepo structure, Next.js is installed in `apps/web/package.json`.

## Solution Options

### Option 1: Configure Root Directory in Vercel Dashboard (Recommended)

1. Go to your Vercel project settings
2. Under "General" → "Root Directory", click "Edit"
3. Set the value to `apps/web`
4. Save the changes

This tells Vercel to treat `apps/web` as the root of your Next.js application.

### Option 2: Use Root-Level vercel.json (Current Configuration)

The root `vercel.json` is configured to:
```json
{
  "framework": "nextjs",
  "installCommand": "pnpm install",
  "buildCommand": "pnpm turbo build --filter=@madfam/web",
  "outputDirectory": "apps/web/.next",
  "ignoreCommand": "git diff HEAD^ HEAD --quiet ."
}
```

This uses Turborepo to build only the web app while maintaining the monorepo structure.

### Option 3: Use App-Level vercel.json

There's also a `vercel.json` in `apps/web/` that explicitly sets:
```json
{
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

If you use this approach, set the Root Directory to `apps/web` in Vercel Dashboard.

## Deployment Steps

1. **For new Vercel projects:**
   - Import your Git repository
   - When prompted, set Root Directory to `apps/web`
   - Vercel should auto-detect Next.js framework
   - Deploy

2. **For existing Vercel projects:**
   - Go to Project Settings → General
   - Update Root Directory to `apps/web`
   - Trigger a new deployment

## Monorepo Structure

```
biz-site/
├── apps/
│   └── web/              # Next.js application
│       ├── package.json  # Contains "next" dependency
│       └── vercel.json   # Optional app-specific config
├── packages/            # Shared packages
├── services/           # Backend services
├── package.json        # Root package.json with workspaces
├── pnpm-workspace.yaml # PNPM workspace configuration
├── turbo.json         # Turborepo configuration
└── vercel.json        # Root Vercel configuration
```

## Environment Variables

Ensure all required environment variables are set in Vercel:
- `NEXT_PUBLIC_ENV`
- `NEXT_PUBLIC_API_URL`
- `DATABASE_URL`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`

## Troubleshooting

If deployment still fails:

1. **Verify Next.js is listed in dependencies:**
   ```bash
   cat apps/web/package.json | grep next
   ```

2. **Check Vercel build logs for specific errors**

3. **Try clearing Vercel cache:**
   - In Vercel Dashboard → Settings → Advanced → Delete Build Cache

4. **Ensure pnpm version matches:**
   - Root `package.json` specifies `"packageManager": "pnpm@8.14.1"`
   - Vercel should use this version automatically

## Additional Resources

- [Vercel Monorepo Documentation](https://vercel.com/docs/monorepos)
- [Deploying Turborepo to Vercel](https://vercel.com/docs/monorepos/turborepo)