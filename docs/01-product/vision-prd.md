# GFE — Vision & Product Requirements Document

**Status:** Draft v1 · **Owner:** Founder · **Audience:** Team, investors, engineering

---

## 1. Vision

GFE is building the world's trusted football ecosystem. Our mission is to help
football talent — especially African talent — go from unseen to seen.

This is not a social network. It is **football infrastructure**: networking,
verification, discovery, recruitment, investment, sponsorship, trials,
representation, commercial partnerships, secure deal-making, documentation,
identity, and trust — all inside one platform.

**One-line pitch:** LinkedIn for football, with Stripe-grade transactions,
DocuSign-grade agreements, Transfermarkt-grade data, and blockchain-anchored
trust.

### Why now, why us

- **The trust gap is the market.** Fake agents, falsified ages, invisible
  mandates and unpaid training compensation are endemic — worst where the
  talent density is highest. Whoever solves verified football identity owns
  the rails everything else runs on.
- **Africa first is a wedge, not a limitation.** Elite African talent is the
  most under-served, highest-upside segment in world football. Serving it
  credibly earns the right to serve everyone.
- **Trials are now formally tracked** in FIFA's 2025 Global Transfer Report —
  the industry is professionalising exactly the workflows GFE productises.

## 2. Target users

| Tier | Roles | MVP? |
|------|-------|------|
| Core supply | Players, Academies | ✅ |
| Core demand | Clubs (pro & semi-pro), Scouts, Sporting Directors | ✅ |
| Intermediaries | Agents (licence-verified) | ✅ |
| Capital | Sponsors, Investors | Phase 2 |
| Amplification | Media, Journalists, Fans | Phase 2 |
| Institutions | Tournament Organisers, Football Schools | Phase 2 |
| Future | Federations, National Teams, Leagues, FAs | Phase 3 |

## 3. Product pillars

1. **Verified football identity** — every user has a role-based professional
   profile; verification badges are earned through KYC/KYB and document
   checks, never bought.
2. **The Football CV** — a portable, exportable (PDF), verifiable career
   record owned by the player.
3. **The Opportunity Graph** — club requests, trials, mandates, sponsorships
   and investments as first-class structured objects, matched by AI.
4. **The Deal Room** — secure, auditable spaces where football business
   actually closes.
5. **Trust rails** — blockchain-anchored timestamps, consent logs, reputation
   and compliance built into every flow, with minor protection as a
   non-negotiable design constraint.

## 4. Feature requirements

Feature keys (F-A … F-T) map to the master specification. `MVP` = 12-week
scope; `P2` = months 4–12; `P3` = year 2.

### F-A · Football profiles (MVP)
Role-based professional profiles. Player profile fields: name, DOB (age
derived; never exposed raw for minors), nationality, position(s), dominant
foot, height, weight, current club/academy, career timeline, past clubs,
competitions, match history, stats (goals, assists, clean sheets, minutes,
cards, role-specific metrics), videos, references, scouting reports,
availability status, representation status, verification badge.
**Acceptance:** a player can complete a profile to 100% in under 15 minutes
on a low-end Android device over 3G.

### F-B · Verified digital football CV (MVP)
Single-page professional CV rendered from the profile; export to PDF;
share by tokenised link with view analytics; verification state shown
per-section (self-declared / academy-confirmed / GFE-verified).
**Acceptance:** PDF renders identically across devices; every shared link is
revocable.

### F-C · Video highlight uploads (MVP)
Upload → transcode → tag: match, competition, date, position, action type
(goal, assist, save, defensive duel, pass, skill, pressing action) →
verified/unverified status. Verified requires the match to exist in the
system and an authorised role (academy, club, approved scout) to confirm.
**Acceptance:** 500MB upload from mobile survives connection loss (resumable).

### F-D · Match statistics (MVP)
Stat provenance ladder: self-uploaded < academy-uploaded < club-uploaded <
verified (approved scout / data partner). Provenance is always displayed;
higher tiers lock lower-tier edits.

### F-E · Club requests (MVP)
Structured demand: position, age band, foot, region, level, trial/transfer/
partnership type, expiry. Examples: "U21 striker", "left-footed CB",
"academy partnership in Ghana", "GK trial candidates".

### F-F · Agent mandates (MVP — verification core)
Mandate object: player consent (dual-signature), duration, territory,
exclusivity, commission terms, agent licence reference. Licence status
checked against FIFA's agent framework where applicable. Un-consented
mandates cannot be published. Minor mandates additionally require guardian
signature and fee caps.

### F-G · Sponsorship marketplace (P2)
Searchable inventory: academies needing kit, tournaments needing title
sponsors, players needing boots, clubs needing shirt sponsors, community
projects. Campaign dashboard + itemised impact reporting.

### F-H · Investment marketplace (P2)
Verified opportunities: academy growth, club investment, facilities, player
development funds, infrastructure, tournaments, media. Gated by investor
KYC; private deal rooms; not a regulated securities exchange in v1 —
introductions + diligence tooling only (see Legal).

### F-I · Academy profiles (MVP)
History, location, facilities, coaches, players, alumni, training model,
safeguarding policies, partnership & investment needs.

### F-J · Trial opportunities (MVP)
Post → apply → shortlist → invite → outcome, with compliance checks
(age verification, guardian consent, education guarantees for minors).

### F-K · Scouting reports (MVP)
Structured template: technical, tactical, physical, mentality, attitude,
potential level, weaknesses, recommended next step. Reports attributed and
timestamped; visible per the player's privacy settings.

### F-L · Messaging (MVP)
Role-gated, verified-only messaging. **Adults may never initiate direct
contact with a minor**; all approaches to minors route through
guardian+academy channels. Full audit trail.

### F-M · Verification system (MVP)
Badges: player, academy, agent, club, sponsor, investor, scout, document,
mandate. Each badge = a documented process with evidence, reviewer, expiry
and revocation.

### F-N · Blockchain-backed records (MVP-lite, P2-full)
Hash-anchoring of critical records (mandates, consents, scouting reports,
CV snapshots) so their existence-at-time and integrity are provable. No
personal data on-chain — see [blockchain.md](../02-architecture/blockchain.md).

### F-O · Smart contracts (P2)
Mandate timestamping, deal milestones, sponsorship milestones, commission
acknowledgement, escrow-style workflows where legally possible, consent
logs, audit trails.

### F-P · Rating & reputation (P2)
Trust score from completed deals, verified activity, recommendations,
conduct history. Anti-gaming: only counterparties to a real, closed deal
can rate; decay over time; disputes freeze scores.

### F-Q · Opportunity board (MVP)
Live board across club requests, trials, mandates, sponsorships,
investments, media requests, academy partnerships. Filter by role fit;
AI-ranked "for you" feed.

### F-R · Deal room (P2; MVP-lite = trial pipeline)
Secure workspace: introductions, documents, NDAs, mandates, negotiation
notes, timelines, compliance checks, milestone tracking. Everything logged.

### F-S · Compliance checks (MVP)
Identity (KYC), organisation legitimacy (KYB), agent licence status, minor
protection gates, data consent, contractual authority.

### F-T · Admin dashboard (MVP)
Verification queue, disputes, approvals, flagged accounts, document review,
payments/commissions (P2), analytics.

### LinkedIn-class social layer (P2)
Connections, followers, endorsements, recommendations, posts, articles,
comments, notifications, company pages, search.

### AI layer (MVP-lite, P2-full)
Recommendations (player↔club, sponsor↔project, investor↔opportunity),
scouting summaries, CV generation, profile optimisation, semantic search,
risk detection (fake agents/clubs), deal intelligence. See
[ai-architecture.md](../04-ai/ai-architecture.md).

## 5. MVP definition (12 weeks)

**Thesis:** prove that verified African talent + trusted demand + a
structured opportunity board produces real trials and mandates.

In scope: player profiles & CV (A, B), video upload with basic tagging (C),
stats with provenance (D), academy profiles (I), club requests (E), trials
pipeline (J), mandates with consent (F), scouting reports (K), gated
messaging (L), verification centre (M, S), opportunity board (Q), hash
anchoring of mandates/consents (N-lite), admin dashboard (T), AI search +
basic matching.

Out of scope for MVP: sponsorship & investment marketplaces, deal rooms
beyond the trial pipeline, payments, reputation scores, social feed, mobile
native apps (mobile web only), federated data partners.

**MVP success metrics:** 500 verified elite players (≥3 African markets),
25 verified academies, 20 verified clubs/scouts orgs, 10 licensed agents,
≥40 opportunities posted, ≥100 applications, ≥10 trials arranged, ≥5
mandates registered — with zero safeguarding incidents.

## 6. Non-goals (v1)

- Processing transfer fees or player payments (introductions + records only)
- Being a regulated investment platform or payment institution
- Public token, cryptocurrency, or NFTs
- Live match streaming
- Replacing federation registration systems (we interoperate later)

## 7. Product principles

1. **Minor protection beats growth.** Any feature that increases reach to
   minors ships only with its safeguarding controls.
2. **Provenance on everything.** Every stat, video and claim carries who
   said it and how it was verified.
3. **The player owns the record.** Portability and consent are product
   features, not legal afterthoughts.
4. **Premium by default.** Black/gold/glass design language; Apple-quality
   interactions; Linear-grade simplicity. Nothing cluttered.
5. **Offline-tolerant, low-bandwidth-first.** Built for the pitches the
   talent actually plays on.
