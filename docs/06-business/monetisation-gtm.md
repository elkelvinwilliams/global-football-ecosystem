# GFE — Monetisation, Go-to-Market & Investor Technical Appendix

## 1. Monetisation model

**Principle:** talent never pays to be seen. Demand-side and value-added
services pay.

| Stream | Who pays | Pricing shape | Phase |
|---|---|---|---|
| Club/Scout subscriptions | Clubs, agencies, scouting orgs | Seats + tiers (search depth, dossiers, pipeline tools) — $99–$999/mo | P1 |
| Verification services | Orgs (KYB), agents (licence badge), optional priority KYC | Flat fees ($49–$499) — costs covered, never "pay for trust outcome" (fees fund process, review can still fail) | P1 |
| Premium player/academy | Players (adult) & academies | CV themes, analytics, showcase placement — $5–$29/mo; academies $49+/mo | P1 |
| Featured listings | Demand side | Featured opportunities/trials placement | P1 |
| Marketplace take-rate | Sponsors, brand deals | 8–12% on facilitated sponsorships (transparent, logged) | P2 |
| Success/introduction fees | Clubs (trials→signing), agencies | Flat success fees where lawful; never % of player wages | P2 |
| Deal-room & escrow tooling | Deal parties | Per-deal-room fee; escrow spread where licensed | P2 |
| Data & API products | Media, analysts, federations | Verified-registry API, embeds, aggregate insights (never raw PII) | P2–P3 |
| White label | Academies, federations, tournaments | Branded portals on GFE rails | P3 |
| Enterprise (club CRM) | Pro clubs | Salesforce-for-recruitment tier | P3 |

Unit economics guardrail: infra <$0.15/MAU; blended gross margin target
>75% (video watch-time is the main COGS lever, controlled via bitrate
policy and premium gating of long-form).

## 2. Go-to-market — Africa first, elite first

1. **Wedge (MVP):** hand-onboard ~25 credible academies in Ghana, Senegal,
   Nigeria; verify their best 500 players; concierge-match to 20 trusted
   clubs/scout networks (EU 2nd divisions, academies, agencies hungry for
   verified African talent). Liquidity is manufactured, not hoped for.
2. **Trust flywheel:** every verified trial/mandate becomes a public
   case study ("unseen → seen"); safeguarding record is marketed as hard
   as the tech.
3. **Supply growth:** academy referral loops (academies recruit academies —
   compensation attribution is their incentive), combine partnerships,
   federation relationships started early but monetised late.
4. **Demand growth:** scout ambassador program; club pilots with success-fee
   only pricing; agent onboarding gated hard by licence verification
   (scarcity = credibility).
5. **Expansion sequence:** West Africa → East/Southern Africa → **Europe**
   (demand-side deepening + diaspora) → **Middle East** (club capital,
   academies) → **Asia** → **North America**. Language order: EN → FR → PT
   → AR.

## 3. Competitive positioning

Transfermarkt = data about the seen; Wyscout/Hudl = video tooling for the
already-connected; LinkedIn = generic identity. **GFE = verified identity +
safeguarded deal rails for the unseen majority.** Moats in order: verified
identity graph, safeguarding reputation, provenance dataset (incl. labelled
video), network liquidity, anchored trust records with switching costs.

## 4. Launch strategy (deliverable #37)

- **T-8w:** founding-academy program signed (25), seed content (style
  films, player stories), waitlist by role.
- **T-4w:** closed beta with academies + 5 clubs; safety/verification drills;
  press kit anchored on safeguarding + "African talent infrastructure".
- **T-0:** pilot launch in 3 markets; launch metric = *verified players with
  ≥1 quality opportunity interaction*, not signups.
- **T+12w:** first success stories → PR wave 2, agent + club sales motion
  opens, Series A dataroom updated with live metrics.

## 5. Investor technical appendix (deliverable #38)

- **Defensible IP:** matching/ranking system on proprietary provenance-
  graded football data; verification ops playbooks; anchored-records trust
  layer; (later) labelled video corpus.
- **Why the architecture derisks the round:** modular monolith = 2-pizza
  team ships MVP in 12 weeks; event backbone + ports mean the expensive
  rewrites (search, media, payments, chain) are swaps, not surgeries;
  documented scale plan to 10M users with named triggers, not vibes.
- **Compliance as asset:** SOC2-track from day one; GDPR/NDPR/POPIA design;
  minor-safety architecture that institutional partners (federations,
  clubs) can audit — this is the enterprise sales unlock.
- **Key technical risks & mitigations:** KYC coverage gaps (dual vendor +
  manual ops), video costs (bitrate policy + premium gating), marketplace
  cold start (concierge wedge), regulatory drift on agents (registry design
  tracks FIFA framework; feature flags per jurisdiction), chain choice
  (adapter + provider-independent proofs).
- **What Series A buys:** mobile apps, deal rooms + payments, 3 new
  markets, data platform, SOC2 Type II, 15-person product org.
