# GFE — Design System & UI Component Library

**Design philosophy:** Premium. Luxury. Modern. Minimal. Elite. Dark mode
default. Black / Gold / White. Glassmorphism used sparingly and purposefully.
Apple-quality interactions, Linear-grade simplicity. Nothing cluttered.

> Scope note: this system governs the **platform application**. The current
> marketing site keeps its pitch-green identity until a coordinated rebrand.

## 1. Foundations

### Colour tokens

| Token | Value | Use |
|---|---|---|
| `bg.base` | `#0A0A0B` | app background (near-black, warm) |
| `bg.raised` | `#111113` | cards, panels |
| `bg.glass` | `rgba(17,17,19,0.62)` + `backdrop-blur(20px)` | overlays, sticky bars, modals only |
| `gold.500` | `#D4AF37` | primary accent — actions, focus, badges |
| `gold.300` | `#E8CD6F` | hover/active accent |
| `gold.700` | `#9C7F1E` | pressed, subdued accents |
| `ink.high` | `#F7F6F2` | primary text (warm white) |
| `ink.mid` | `#B9B7AF` | secondary text |
| `ink.low` | `#6E6D66` | placeholders, meta |
| `line.subtle` | `rgba(247,246,242,0.08)` | hairlines |
| `line.strong` | `rgba(212,175,55,0.35)` | accent borders |
| `state.success` | `#3DBB7A` · `state.warn` `#E7A13B` · `state.danger` `#E5484D` · `state.info` `#5B9BD5` | semantic only, never decorative |

Rules: gold is spent, not sprayed — one primary action per view; success ≠
gold (verification uses gold badge + label, states use semantic colours);
light mode exists (P2) as warm-paper inversion, tokens only.

### Typography

| Role | Face | Notes |
|---|---|---|
| Display / headings | **Söhne** (or Neue Haas Grotesk; fallback Inter) | tight tracking, weight 600 |
| Body / UI | **Inter** | 15px base, 1.55 line-height |
| Data / mono | **JetBrains Mono** | stats, ids, hashes; `tabular-nums` everywhere numbers align |

Scale (px): 12 · 13 · 15 · 17 · 20 · 24 · 30 · 38 · 48. Headings use
`text-wrap: balance`; body measure ≤ 68ch.

### Space, radius, elevation, motion

- Space: 4-base scale (4…64). Radius: `sm 8 · md 12 · lg 16 · pill 999`.
- Elevation: shadows barely-there (`0 1px 0 rgba(255,255,255,.04) inset`,
  `0 16px 40px -24px #000`); glass only for floating layers.
- Motion: 150ms micro / 240ms panel, `cubic-bezier(.2,.8,.2,1)`; page
  transitions ≤ 300ms; **all motion behind `prefers-reduced-motion`**;
  skeletons over spinners.

### Accessibility

WCAG 2.2 AA: gold-on-black passes for large text/icons; body text always
`ink.high/mid`. Focus = 2px gold ring + offset. Hit targets ≥ 44px. Full
keyboard paths on all flows incl. signing.

## 2. Component library (`@gfe/ui`)

Primitives on Radix UI + Tailwind (CVA variants), exported from
`platform/packages/ui`:

| Category | Components |
|---|---|
| Core | Button (primary/ghost/danger/gold-outline), IconButton, Input, Select, Combobox, DatePicker, Tag, Chip, Tooltip, Toast, Modal/Sheet (glass), Tabs, Accordion, Skeleton, EmptyState |
| Identity | Avatar (+org mark), RoleBadge, **VerifiedBadge** (tiered: doc/identity/full — gold seal + label), TrustScore (P2) |
| Football | PlayerCard, StatTile, ProvenanceTag (SELF/ACADEMY/CLUB/VERIFIED), PositionPin (pitch mini-map), CareerTimeline, VideoCard (+verification ribbon), CVSection, ComparisonTable |
| Marketplace | OpportunityCard, CriteriaChips, ApplicationStepper, DeadlinePill |
| Deals | MandateCard (state ribbon), ConsentPanel (dual-signature progress), MilestoneTrack, DocumentRow (hash + anchor check), AuditTrail |
| Messaging | ThreadList, MessageBubble, GuardianGateNotice |
| Data | DataTable (virtualised), FacetFilterBar, SearchOmnibox (⌘K), Sparkline, PercentileBar |

Every component ships with: dark (default) + light tokens, RTL support,
loading/empty/error states, Storybook story + interaction test.

## 3. Page inventory (specs in ux.md)

Landing · Auth/Onboarding (role-based) · Dashboard (per role) · Player
Profile & CV · Academy Profile · Club Recruitment Dashboard · Search ·
Opportunity Board · Opportunity Detail + Apply · Trial Pipeline · Mandates &
Consent Signing · Deal Room · Messaging · Verification Centre · Sponsor /
Investor Marketplaces (P2) · Notifications · Settings (privacy, guardians,
consents) · Payments (P2) · Admin Console.

## 4. Voice & content design

Confident, spare, football-literate. Buttons say the action ("Request
consent", "Invite to trial"), never "Submit". Verification language is
precise: *"Academy-confirmed"* ≠ *"GFE-verified"* — the UI never inflates
trust. Numbers get provenance labels wherever shown.
