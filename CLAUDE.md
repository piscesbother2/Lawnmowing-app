# Mowpro — multi-tenant lawn-care SaaS

> GitHub repo: `piscesbother2/Lawnmowing-app` · Product / Supabase / Vercel name: **Mowpro**
> Working copy: `C:\Github\Lawnmowing-app`
> Auto-memory: `C:\Users\pisce\.claude\projects\C--Github-Lawnmowing-app\memory\`

## Status & decisions (locked 2026-04-29)
- Canonical working copy: `C:\Github\Lawnmowing-app`. The earlier clone at `C:\Users\pisce\Lawnmowing-app` is left in place but is **not** the source of truth — do not edit it.
- Supabase + Vercel project name: **Mowpro** (the GitHub repo keeps its existing name `Lawnmowing-app`).
- Supabase region: **us-east-1** (N. Virginia).
- Supabase organization to create the project under: `tzvrsxonibizdrzyuynx` (the only org on this account).
- Vercel team: `team_wsC5QRA70RL8FlYcWXGnHSgj` (`ekiser-dspcoders-projects`).
- MCPs verified working: Supabase MCP, Vercel MCP.
- Phase: **Phase 0 — not started.** Repo currently contains only `Initial-Commit` and a placeholder `test.js`.

## Mission
Build a multi-tenant SaaS for lawn-care operators (mowing, trimming, mulching).
The owner runs a real lawn-care business and is customer #1 — every feature must
either save admin/route time or surface a revenue/upsell action. No generic CRM
fluff. AI features should actively recommend how to earn more, not just record
what happened.

## Repo & deployment model
- Repo: `C:\Github\Lawnmowing-app` (GitHub: piscesbother2/Lawnmowing-app)
- Owner does NOT program locally. The flow is: Claude pushes code to GitHub →
  Vercel auto-deploys → owner tests on the live URL.
- Use the Vercel MCP for deploy logs and Supabase MCP for DB/edge-function work.
- Verify both MCPs at the start of every session via `list_projects` calls.

## Stack (decided — do not relitigate)
- Frontend: Next.js (App Router) on Vercel — scaffolded at v16.2 (whatever `create-next-app@latest` gives is fine; do not pin)
- Mobile: PWA first (installable). Native (Expo) only if push/camera force it.
- DB / Auth / Storage / Edge Functions: Supabase
- Billing: Stripe Subscriptions + Customer Portal
- Maps: Mapbox GL JS for polygon-draw + sqft. Google Routes API later for routing.
- AI: Claude API (claude-opus-4-7 or claude-sonnet-4-6) via Supabase Edge Functions
- Email: Resend (also Supabase SMTP provider for magic links)

## Multi-tenant rules (non-negotiable)
- Every business table has `org_id uuid not null` from migration #1. Never retrofit.
- RLS enabled on every table. Standard policy:
  `using (org_id in (select org_id from org_members where user_id = auth.uid()))`
- Smoke-test isolation after every schema change: create 2 orgs, verify org A
  cannot read or write org B's rows.
- `service_role` key is server-only. Never expose via `NEXT_PUBLIC_*`.
- After every migration, run `get_advisors` and resolve any RLS/security warnings
  before moving on.

## Data model (v1)
```
organizations         (id, name, plan, stripe_customer_id, created_at)
org_members           (org_id, user_id, role)
customers             (id, org_id, name, phone, email, billing_address)
properties            (id, org_id, customer_id, address, lat, lng,
                       polygon geometry(Polygon,4326), sqft)
service_types         (id, org_id, name, default_price, default_duration_min)
jobs                  (id, org_id, property_id, service_type_id,
                       scheduled_at, status, price)
job_visits            (id, org_id, job_id, started_at, ended_at, notes,
                       photo_keys text[])
invoices              (id, org_id, customer_id, stripe_invoice_id, total, status)
expenses              (id, org_id, category, amount, occurred_on)
ai_insights           (id, org_id, kind, payload jsonb, created_at, dismissed_at)
subscriptions         (org_id pk, stripe_subscription_id, plan, status,
                       current_period_end)
```

Required Postgres extensions: `pgcrypto`, `postgis`, `pg_cron`.

## Storage buckets
- `property-photos`  (path: `{org_id}/{property_id}/{uuid}.jpg`, RLS by org_id)
- `invoice-pdfs`     (private, RLS by org_id)
- `org-logos`        (RLS by org_id)

## Edge functions to build (in this order, not all at once)
1. `stripe-webhook`        — sync subscription status from Stripe events
2. `ai-pricing-suggest`    — Claude call: job context → suggested price
3. `ai-weekly-digest`      — pg_cron-driven, writes to ai_insights
4. `optimize-route`        — Google Routes wrapper (Phase 5 only)

Lawn area calc stays client-side with turf.js — no edge function needed.

## Pricing tiers (placeholder, refine after dogfooding)
- Free  $0   — 10 active customers, core ops only
- Solo  $29  — unlimited, + lawn sizing + route optimization
- Pro   $79  — + 2 crew seats, AI pricing + ROI digest + territory tools
- Crew  $149 — + 5 crew seats, upsell signals + advanced analytics

## Phased rollout
- **Phase 0 (week 1):** Next.js + Supabase scaffold, Vercel deploy, magic-link auth,
  org signup flow, RLS smoke test, Stripe Checkout wired (even if Free tier only).
- **Phase 1 (weeks 2–3):** Customers + Properties + Jobs CRUD, schedule view, basic
  invoicing (manual line items + Stripe payment links), mobile-friendly job-day
  view (today's stops, tap to mark done).
- **Phase 2 (weeks 4–5):** Mapbox polygon-draw lawn sizing, auto-quote from sqft.
- **Phase 3 (weeks 6–7):** Claude weekly ROI digest + per-job pricing suggestions.
- **Phase 4 (weeks 8–10):** Territory heatmap, ICP scoring, drive-by mode.
- **Phase 5 (weeks 11–12):** Google Routes optimization, upsell signals.

**Current focus: Phase 0 → Phase 1.** Do not start Phase 2+ work until owner
has dogfooded Phase 1 on real customers for at least a week.

## Vercel env vars (set before each phase needs them)
- **Phase 0:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_APP_URL`, `RESEND_API_KEY`,
  `RESEND_FROM_EMAIL`
- **Phase 1 billing:** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`,
  `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_SOLO`, `STRIPE_PRICE_PRO`,
  `STRIPE_PRICE_CREW`
- **Phase 2:** `NEXT_PUBLIC_MAPBOX_TOKEN`
- **Phase 3:** `ANTHROPIC_API_KEY`
- **Phase 5:** `GOOGLE_ROUTES_API_KEY`

## Working agreement with the owner
- Owner is the business owner + product owner, not a developer. Explain
  tradeoffs in plain language. Tie features back to revenue, time saved, or
  customer growth — never just "code correctness."
- Ask before any destructive action (DB drop, force-push, deleting Vercel
  projects, deleting Stripe products, etc.).
- Owner serves a multi-county area from one home base; SaaS will eventually
  serve operators in many regions. Design for multi-region tenants but don't
  over-engineer geography for v1.
- Keep folder layout clean: Next.js app at repo root.

## Definition of done for Phase 0
- [ ] Supabase project `Mowpro` provisioned in `us-east-1`
- [ ] Migrations 0001–0004 applied, `get_advisors` clean
- [ ] Auth: magic link via Resend works end-to-end on the live Vercel URL
- [ ] New-user trigger creates personal organization + org_members row
- [ ] Two-org RLS smoke test passes
- [ ] Stripe Checkout opens for Solo plan in test mode
- [ ] `stripe-webhook` edge function deployed, syncs subscriptions row
- [ ] TypeScript types generated and committed to `lib/database.types.ts`
- [ ] Next.js app deploys cleanly to Vercel from `main`
- [ ] Owner can sign up, create an org, and reach a (mostly empty) dashboard
      on the live URL

## First actions (in order)
1. ~~Verify Supabase MCP via `list_projects`.~~ ✅ done 2026-04-29.
2. ~~Verify Vercel MCP via `list_projects`.~~ ✅ done 2026-04-29.
3. ~~Confirm canonical repo path, project name, Supabase region.~~ ✅ done 2026-04-29 — Mowpro / us-east-1 / `C:\Github\Lawnmowing-app`.
4. Scaffold Next.js 15 (App Router, TypeScript, Tailwind, ESLint) at repo root. Replace placeholder `test.js`.
5. Push to GitHub `main`. Confirm Vercel auto-deploys (owner connects the repo
   in Vercel dashboard if not already).
6. Create Supabase project `Mowpro` in `us-east-1` via MCP, capture URL + keys, owner pastes into Vercel env vars.
7. Apply migrations 0001 (extensions + organizations + org_members + RLS helpers),
   then 0002 (customers/properties/service_types/jobs), then 0003 (billing),
   then 0004 (ai_insights + cron). Run `get_advisors` between each.
8. Wire Supabase client (browser + server), magic-link login, org-creation
   trigger on new user.
9. Run two-org RLS smoke test. Document the test in `tests/rls.smoke.md`.
10. Wire Stripe Checkout + webhook for Solo plan. Stop and demo to owner before
    moving to Phase 1.

## Open questions still to answer
- Custom domain name, or use the Vercel-provided URL until later?
- Tax / Stripe legal entity — sole proprietor or LLC? (Affects Stripe onboarding,
  not the build, but worth knowing.)
- Brand color / logo direction (or skip styling for now and keep Tailwind defaults).
