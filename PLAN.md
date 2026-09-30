# Greenloop Expansion Architecture

## Current
- Monolithic `src/app/page.tsx` (941 lines) with all sections as functions
- Single-page site, all anchor links

## New Route Structure (Next.js App Router)

| Route | File | Purpose |
|-------|------|---------|
| `/` | `src/app/page.tsx` | Home (slimmed Hero + Packages + Reviews) |
| `/savings` | `src/app/savings/page.tsx` | Solar savings calculator (roof size, bill, zip) |
| `/install` | `src/app/install/page.tsx` | Interactive process stepper |
| `/faq` | `src/app/faq/page.tsx` | FAQ accordion + state rebate filters |
| `/lead` | `src/app/lead/page.tsx` | Lead form with real-time system size estimate |
| `/chart` | `src/app/chart/page.tsx` | Before/after energy usage bar chart |
| `/api/estimate` | `src/app/api/estimate/route.ts` | API endpoint (deterministic fallback) |

## Shared Components
- `src/components/marketing/header.tsx` — Nav bar (links to actual routes now)
- `src/components/marketing/footer.tsx` — Footer

## Data Flow
- All interactive calculators are client-side JS (no DB needed)
- API route returns JSON with deterministic solar math
- FAQ data is static JSON embedded in the page
- State rebate data is a static mapping

## Component Reuse
- UI primitives from `src/components/ui/` (Button, Card, Input, Select, Slider, Badge)
- Each new route is a clean page.tsx with "use client" or server as needed