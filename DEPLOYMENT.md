# SEOLOGY.AI Deployment Guide

Complete deployment guide for production on Vercel.

## Prerequisites

- Vercel account with GitHub connected
- PostgreSQL database (Supabase/Railway/Neon recommended)
- All required API keys ready

## Environment Variables

Configure in Vercel Dashboard → Settings → Environment Variables:

### Core Services
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `ANTHROPIC_API_KEY` - Claude AI API key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `ENCRYPTION_KEY` - 32-char random string
- `CRON_SECRET` - Secure cron authentication
- `RESEND_API_KEY` - Email service key

## Quick Deploy

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login and link project
vercel login
vercel link

# 3. Deploy
vercel --prod
```

## Automated Systems

The platform includes automated systems configured via `vercel.json`:

- **Daily Backup** (3:00 AM UTC)
- **Cleanup** (2:00 AM UTC)
- **Usage Reset** (1st of month)

## Post-Deployment

1. Configure Stripe webhook: `https://yourdomain.com/api/billing/webhook`
2. Configure Clerk webhook: `https://yourdomain.com/api/webhooks/clerk`
3. Test API at: `https://yourdomain.com/docs`
4. Verify cron jobs running
5. Test user signup flow

## Monitoring

- View logs: `vercel logs --follow`
- Analytics: Vercel Dashboard
- Error tracking: Check API logs

## Support

For deployment issues: https://github.com/anyrxo/seology/issues
