# GFE — Roadmaps, Sprint Plan & Engineering Breakdown

## 1. Team assumption (MVP)

1 tech lead/backend, 2 full-stack TS, 1 product designer, 1 founder-PM,
fractional: DevOps, security reviewer, counsel. (Plan scales linearly if
team is smaller — sequence holds.)

## 2. MVP roadmap — 12 weeks (deliverable #27)

| Weeks | Sprint theme | Ships |
|---|---|---|
| 1–2 | **Foundations** | Monorepo, CI/CD, envs, Terraform baseline, auth (OTP+refresh), user/org models, RBAC skeleton, design tokens + core UI kit |
| 3–4 | **Identity & trust core** | KYC/KYB integration, guardianship flows, verification cases + admin queue v0, audit log + hash chain, RLS policies + tests |
| 5–6 | **Talent** | Player profile + career timeline + stats w/ provenance, academy profiles, CV web view + PDF export + share links, resumable video upload → transcode → tagging |
| 7–8 | **Marketplace** | Opportunities (club requests + trials), applications w/ minor-consent gates, opportunity board + facets, Meilisearch indexing |
| 9 | **Representation** | Mandates + dual/triple consent ceremony, registry view, anchoring service live (AnchorRegistry on testnet → mainnet) |
| 10 | **Comms & AI-lite** | Gated messaging w/ guardian routing, notifications, semantic search + basic matching w/ explanations |
| 11 | **Hardening** | Pentest fixes, load tests, safety-queue drills, DSAR drill, observability SLOs, low-end-device pass |
| 12 | **Pilot launch** | Seeded launch: 3 markets (e.g. Ghana, Senegal, Nigeria), 25 academies onboarded hands-on, admin playbooks, metrics dashboard |

Definition of done for MVP = success metrics in PRD §5.

## 3. Production roadmap — 24 months (deliverable #28)

| Quarter | Theme | Highlights |
|---|---|---|
| Q1 (post-MVP) | **Liquidity & trust deepening** | Scout structured reports at scale, reputation v1, social layer (posts/follows), FR localisation, mobile apps beta (Expo) |
| Q2 | **Deal infrastructure** | Deal rooms GA, MandateRegistry contract, document vault + NDAs, payments rails (subscriptions via Stripe+Paystack), verification fees |
| Q3 | **Capital marketplaces** | Sponsorship marketplace GA, investment marketplace (introductions+diligence), campaign/impact reporting, club CRM-lite (pipelines) |
| Q4 | **Scale & data** | OpenSearch, Kafka backbone, media service extraction, EU expansion (GDPR-complete), data products alpha (verified registry API), SOC2 Type I |
| Q5 | **Intelligence** | Match/video auto-tagging alpha, deal intelligence, trust score v2, white-label academy portals, Middle East entry |
| Q6 | **Institutional** | Federation pilots (registry interop), MilestoneEscrow where licensed, API platform GA, SOC2 Type II, Asia/NA groundwork |

## 4. Engineering task breakdown (deliverable #39, epic level)

- **E1 Platform foundations:** monorepo, CI, IaC, envs, observability,
  flags *(≈18 tasks)*
- **E2 Identity & access:** auth, orgs, guardianship, RBAC/RLS, sessions
  *(≈22)*
- **E3 Trust & compliance:** KYC/KYB ports, verification cases, badges,
  consents, audit chain, fraud rules v0 *(≈20)*
- **E4 Talent:** profiles, timeline, stats provenance, media pipeline, CV +
  PDF, scouting reports *(≈26)*
- **E5 Marketplace:** opportunities, applications, trials, board, search
  indexing *(≈18)*
- **E6 Representation:** mandates, consent ceremony, registry, anchoring
  *(≈14)*
- **E7 Comms:** threads, guardian routing, notifications *(≈12)*
- **E8 AI:** query parse, embeddings, matching, explanations *(≈10)*
- **E9 Admin:** queues, entity ops, analytics *(≈14)*
- **E10 Hardening & launch:** security, load, drills, seeding tools *(≈12)*

## 5. GitHub milestones & issue conventions (deliverable #40)

Milestones = `M1 Foundations` … `M6 Pilot Launch` (two-week cadence
matching sprints). Labels: `epic:E1…E10`, `area:api|web|infra|contracts`,
`type:feat|bug|chore|security`, `prio:P0–P3`, `safety-review` (mandatory on
anything minor-facing). Issue template requires: user story, acceptance
criteria, threat notes, analytics events, flag name. Definition of Ready /
Done encoded in PR template checklist. Seed issue list = one issue per task
in §4 (importable script in `platform/scripts/seed-issues.md` once repo
splits).

## 6. Sprint plan (deliverable #41)

Two-week sprints S1–S6 mapping to §2 rows. Ceremonies: Monday planning
(capacity-based, epics→tasks), daily async check-in, Friday demo against
acceptance criteria, retro every sprint end. Carry-over rule: >20%
carry-over triggers scope cut, never deadline slip on safety/trust epics —
compliance work is not descopable.
