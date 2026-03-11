# Barbershop SaaS - CLAUDE.md

## Project Overview
Multi-tenant SaaS platform that provides booking websites for barbershops and hair salons. Barbershop owners ("tenants") subscribe, fill out an onboarding form, and receive a custom booking website integrated with Google Calendar. Content is in **Spanish** (target market: Spain / Latin America).

## Tech Stack
- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v3, shadcn/ui (Radix UI primitives)
- **Auth:** Clerk (@clerk/nextjs)
- **Database & Storage:** Supabase (PostgreSQL + file storage)
- **Payments:** Stripe (subscriptions via webhooks)
- **Calendar:** Google Calendar API (OAuth2 per tenant)
- **Email:** Resend
- **Forms:** React Hook Form + Zod
- **Package Manager:** pnpm

## Project Structure
```
app/
  page.tsx                    # Global marketing homepage
  layout.tsx                  # Root layout
  global.css                  # Global styles + CSS vars
  (global)/layout.tsx         # Marketing section layout
  [tenantId]/                 # Tenant-specific barbershop site
    page.tsx                  # Tenant homepage
    layout.tsx                # Tenant layout (navbar, footer)
    reservation/              # Booking flow
    services/                 # Services listing
    components/hero/          # Tenant hero & contact bar
    components/gallery/       # Image carousels
  dashboard/                  # Owner dashboard (earnings, stats)
  onboarding/                 # New tenant onboarding form
  api/
    auth/                     # Google OAuth callbacks
    [tenantId]/bookings/      # Booking CRUD
    [tenantId]/email/         # Email sending
    [tenantId]/tenant-data/   # Tenant config API
    webhooks/clerk/           # Clerk user sync
    webhooks/stripe/          # Stripe subscription events
    create-checkout-session/  # Stripe checkout
    cancel-subscription/      # Stripe cancel

components/
  (home-global)/              # Marketing homepage sections
    hero-global/Hero.tsx      # Main hero
    hero-global/FeatureCards.tsx
    how-it-works/HowItWorks.tsx
    how-it-works/constants-how-it-work.ts
    client-section/ClientsSection.tsx
    client-section/ClientCard.tsx
    pricing-card/Pricing.tsx
    pricing-card/PricingCard.tsx
    pricing-card/pricingConstants.ts
  ui/                         # shadcn/ui components
  theme-provider.tsx
```

## Design System

### Marketing Homepage (components/(home-global)/)
- **Theme:** Dark premium — `zinc-950` / `zinc-900` backgrounds, `amber-400`/`amber-500` accent
- **Typography:** Bold, large headings; `zinc-400` for muted text; white for primary
- **Cards:** `bg-zinc-900 border border-zinc-800` with hover effects

### Tenant Pages (app/[tenantId]/)
- **Theme:** Sky/blue color scheme (per-tenant customization possible)
- **CSS vars defined in:** `app/[tenantId]/globals.css`

### Global CSS vars
- Defined in `app/global.css` (light/dark mode via CSS custom properties)
- Tailwind theme extended in `tailwind.config.ts`

## Key Business Logic
- Each tenant gets a unique `tenantId` subdirectory
- Bookings sync to the tenant's Google Calendar (events include client data + cancel link)
- Cancellation removes the Google Calendar event and frees the slot
- Subscription gating: tenants need active Stripe subscription to use booking features
- Onboarding fills supabase DB with tenant config (services, hours, gallery images, etc.)

## Pricing (pricingConstants.ts)
- **Plan Básico:** €60/mes — basic features, email support
- **Plan Anual:** €30/mes — includes priority support, analytics, premium customization, 2 months free

## Commands
```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # ESLint
```

## Notes
- `FeatureCards.tsx` exists but is **not currently used** in the hero
- WhatsApp CTA links use number `34623735521`
- Supabase storage bucket: `salon-assets`
