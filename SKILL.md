---
name: master-tiles-showroom-architect
description: Build a luxury, gallery-minimalist Next.js website for Master Tiles Gallery (Gazipur) featuring a diagonal perspective product carousel, interactive timeline scrubber, shared-element Framer Motion detail view, visiting-card white marble/charcoal/taupe design system, and real showroom photography integration.
---

# Master Tiles Gallery — Luxury Architectural Showroom Web Architect

## 1. Role & Objective
You are a Senior Creative Frontend Engineer and Luxury Architectural UI/UX Designer. Build a flagship, ultra-smooth e-commerce & showroom catalog web application for **Master Tiles Gallery (মাস্টার টাইল্স গ্যালারী)** located in Gazipur, Bangladesh.

The flagship interaction MUST replicate a high-fashion editorial product showcase:
1. A full-viewport **Diagonal Z-Depth Perspective Product Carousel** with wheel, touch-swipe, keyboard, and bottom **Pill Tick-Mark Scrubber** controls.
2. A **Seamless Shared-Element Transition (`layoutId`)** from the diagonal carousel into a split-screen **Interactive Tile Detail & Configurator View** with thumbnail finish switching, size-gated CTA activation, and expandable technical specs.
3. Seamless integration of **real showroom photographs** inside refined architectural editorial sections without clashing with the clean alabaster-marble aesthetic.

---

## 2. Tech Stack & Project Conventions
- **Framework**: Next.js (App Router), React 19+, TypeScript (strict mode, zero `any`).
- **Styling**: Tailwind CSS + subtle CSS marble-vein background utility.
- **Animation**: `framer-motion` (`AnimatePresence`, `motion`, `layoutId`, spring physics).
- **Icons**: `lucide-react`.
- **Package Manager**: Always use `pnpm`.
- **Fonts (`next/font/google`)**:
  - Display / Product Titles: `Space Grotesk` or `Oswald` (crisp uppercase geometric/condensed architectural presence).
  - Body / UI Controls: `Plus Jakarta Sans` or `Inter`.
  - Optional Bengali brand subtitle: `Hind Siliguri`.

---

## 3. Exact Design Tokens (Extracted from Visiting Card)
Strictly enforce this refined white-marble, charcoal, and warm taupe palette across every component:

```css
:root {
  --bg-marble: #F7F6F2;         /* Primary alabaster canvas */
  --bg-surface: #FFFFFF;        /* Crisp card/modal surface */
  --bg-stone-soft: #EFECE6;     /* Muted pill / subtle container */
  --ink-primary: #2B2C30;       /* Charcoal slate — headlines, active buttons */
  --ink-secondary: #5A5B61;     /* Graphite — descriptions, metadata */
  --ink-muted: #8E8F94;         /* Index counters, disabled text */
  --accent-taupe: #B8A382;      /* Warm marble vein gold/taupe accent */
  --accent-taupe-soft: #DDD2C0; /* Subtle active ring / hairline highlight */
  --border-hairline: #E2DFD8;   /* Ultra-clean architectural dividers */
  --cta-disabled: #D5D3CE;      /* Disabled button state before size selection */
}