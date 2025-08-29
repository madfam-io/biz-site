# Infrastructure Documentation

This directory contains comprehensive documentation about the MADFAM corporate website infrastructure requirements and deployment strategies.

## Documents

### Core Infrastructure

- **[INFRASTRUCTURE_REQUIREMENTS.md](./INFRASTRUCTURE_REQUIREMENTS.md)**
  - Complete analysis of infrastructure needs
  - Vercel compatibility assessment
  - Recommended architecture (Vercel + Railway)
  - Component-specific requirements
  - Cost analysis and optimization

### Migration Guides

- **[VERCEL_RAILWAY_MIGRATION.md](./VERCEL_RAILWAY_MIGRATION.md)**
  - Step-by-step migration guide
  - Phase-by-phase implementation
  - Zero-downtime migration strategy
  - Rollback procedures
  - Post-migration monitoring

## Quick Reference

### Current Architecture Status

| Component     | Platform        | Status                |
| ------------- | --------------- | --------------------- |
| Main App      | Vercel          | ✅ Compatible         |
| Database      | Vercel Postgres | ✅ Compatible         |
| API Routes    | Vercel          | ✅ Compatible         |
| CMS           | Railway         | 🔄 Migration Required |
| Email Queue   | Railway         | 🔄 Migration Required |
| Media Storage | Cloudflare R2   | 🔄 Optional           |

### Infrastructure Stack

#### Production (Recommended)

```
┌─────────────────────────────────────┐
│           VERCEL                    │
│  - Next.js App                      │
│  - API Routes                       │
│  - Database (Postgres)              │
│  - Global CDN                       │
└─────────────────────────────────────┘
           ↕ API ↕
┌─────────────────────────────────────┐
│           RAILWAY                   │
│  - Payload CMS                      │
│  - Background Workers               │
│  - Email Queue                      │
│  - CMS Database                     │
└─────────────────────────────────────┘
           ↕ Storage ↕
┌─────────────────────────────────────┐
│       CLOUDFLARE R2                 │
│  - Media Storage                    │
│  - CDN for Assets                   │
│  - Backup Storage                   │
└─────────────────────────────────────┘
```

### Monthly Cost Breakdown

| Service       | Cost       | Notes                 |
| ------------- | ---------- | --------------------- |
| Vercel Pro    | $20        | Main application      |
| Railway       | $10-20     | CMS + workers         |
| Cloudflare R2 | $5-15      | Optional, usage-based |
| **Total**     | **$35-55** | Full infrastructure   |

## Key Decisions

### Why Not Vercel Alone?

Vercel doesn't support:

- Persistent Node.js servers (needed for Payload CMS)
- Background workers (email queue processing)
- Local file storage (media uploads)
- Long-running processes (>10s limit)

### Why Railway?

- Full Node.js runtime support
- Persistent file storage
- Background job support
- Cost-effective for CMS hosting
- Easy integration with Vercel

### Why Cloudflare R2?

- S3-compatible API
- Cost-effective storage
- Global CDN included
- No egress fees
- Scales with usage

## Migration Timeline

| Phase     | Duration     | Description           |
| --------- | ------------ | --------------------- |
| Phase 1   | 3 days       | Vercel setup          |
| Phase 2   | 4 days       | Railway configuration |
| Phase 3   | 3 days       | Database migration    |
| Phase 4   | 4 days       | Media storage setup   |
| Phase 5   | 3 days       | Integration testing   |
| Phase 6   | 1 day        | DNS configuration     |
| Phase 7   | 1 day        | Go live               |
| **Total** | **~3 weeks** | Complete migration    |

## Environment Variables

### Vercel

```env
DATABASE_URL=postgres://...
NEXT_PUBLIC_CMS_URL=https://cms.railway.app
RESEND_API_KEY=...
```

### Railway

```env
DATABASE_URL=postgresql://...
PAYLOAD_SECRET=...
R2_ENDPOINT=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
```

## Support & Resources

### Documentation

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2)
- [Payload CMS Documentation](https://payloadcms.com/docs)

### Internal Resources

- [Deployment Guide](../deployment/DEPLOYMENT.md)
- [Architecture Documentation](../development/ARCHITECTURE.md)
- [Database Schema](../development/DATABASE_SCHEMA.md)

## Next Steps

1. Review [INFRASTRUCTURE_REQUIREMENTS.md](./INFRASTRUCTURE_REQUIREMENTS.md)
2. Follow [VERCEL_RAILWAY_MIGRATION.md](./VERCEL_RAILWAY_MIGRATION.md)
3. Update environment variables
4. Test in staging environment
5. Execute production migration

---

_Last Updated: November 2024_
_Maintained by: MADFAM Development Team_
