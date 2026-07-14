# GFE — Software Requirements Specification (SRS)

**Standard:** ISO/IEC/IEEE 29148-informed · **Status:** Draft v1
Requirement IDs: `FR-` functional, `NFR-` non-functional. Priority: M (MVP),
2 (Phase 2), 3 (Phase 3). Feature keys reference the PRD (F-A … F-T).

## 1. System context

GFE is a multi-tenant web platform (mobile-first responsive; native apps in
Phase 2) with a modular-monolith backend, PostgreSQL system of record,
object storage for media, an async worker tier, an AI service layer, and a
blockchain anchoring service writing hashes to an EVM chain. External
integrations: KYC/KYB provider, video transcoding, email/SMS/push, payments
(Phase 2), FIFA agent-licence reference data (manual import in MVP).

## 2. Functional requirements

### 2.1 Identity, accounts & roles
- **FR-001 (M)** Users register with email or phone; verify via OTP.
- **FR-002 (M)** A user selects exactly one primary role at onboarding
  (Player, Academy, Club, Scout, Agent, …); additional org memberships may
  be granted later. Role changes require admin approval.
- **FR-003 (M)** Organisations (academy, club, agency, sponsor, investor,
  media) are entities with member users and per-member org roles
  (owner/admin/staff).
- **FR-004 (M)** Users under 18 are Minor accounts: require verified
  guardian linkage; guardian co-consent is required for publishing profile,
  video, mandate and trial applications.
- **FR-005 (M)** RBAC: every API resource declares required role +
  relationship (e.g. `mandate.read` → party to mandate, or admin).
- **FR-006 (M)** Account states: pending, active, restricted, suspended,
  deleted (soft, GDPR-erasable).

### 2.2 Profiles & CV (F-A, F-B)
- **FR-010 (M)** Player profile with fields per PRD §F-A; per-field
  visibility controls (public / network / verified-orgs / private).
- **FR-011 (M)** Career timeline entries (club, competition, role, dates)
  with provenance tier per entry.
- **FR-012 (M)** CV render: web view + server-side PDF export; tokenised
  share links with revocation and view counts.
- **FR-013 (M)** Verification state displayed per section; aggregated badge
  per PRD §F-M.
- **FR-014 (2)** Endorsements, recommendations, references with author
  attribution.

### 2.3 Media (F-C)
- **FR-020 (M)** Resumable uploads (tus or multipart) up to 2GB; transcode
  to HLS ladder; thumbnail generation.
- **FR-021 (M)** Tagging: match, competition, date, position, action type
  enum; multiple tags per clip.
- **FR-022 (M)** Video verification workflow: authorised role confirms the
  fixture; state machine unverified → pending → verified/rejected.
- **FR-023 (2)** Clip trimming, highlight-reel composition in-browser.

### 2.4 Stats (F-D)
- **FR-030 (M)** Stat entries keyed to (player, match) with provenance tier:
  self < academy < club < verified-partner; UI always shows tier.
- **FR-031 (M)** Higher-tier submission supersedes and locks lower tiers;
  audit log records replacements.
- **FR-032 (2)** Bulk import (CSV, data-partner API).

### 2.5 Opportunities (F-E, F-J, F-Q)
- **FR-040 (M)** Club requests: structured fields (type, position, age band,
  foot, region, level, description, expiry); publish/close lifecycle.
- **FR-041 (M)** Trials: application → shortlist → invite → outcome;
  applicant sees status; compliance gates block minor applications without
  guardian consent + education guarantee acknowledgement.
- **FR-042 (M)** Opportunity board with role-aware filtering and AI ranking.
- **FR-043 (2)** Sponsorship & investment listings with gated visibility.

### 2.6 Mandates & deals (F-F, F-O, F-R)
- **FR-050 (M)** Mandate object: agent, player, duration, territory,
  exclusivity, commission, licence ref; states draft → awaiting-consent →
  active → expired/terminated/disputed.
- **FR-051 (M)** Dual e-signature (player + agent; + guardian if minor);
  consent artefacts stored, hashed and anchored (FR-080).
- **FR-052 (M)** Public mandate registry view: who represents whom, since
  when (territory/exclusivity visible to verified orgs only).
- **FR-053 (2)** Deal rooms: membership, docs, NDAs, notes, milestones,
  compliance checklist; immutable activity log.
- **FR-054 (2)** Commission acknowledgement records on deal close.

### 2.7 Scouting (F-K)
- **FR-060 (M)** Structured report template per PRD; drafts private to
  author org; publishing governed by player privacy settings.
- **FR-061 (2)** Report quality scoring and scout track-record stats.

### 2.8 Messaging (F-L)
- **FR-070 (M)** 1:1 and org↔user threads between verified users; role
  gating matrix; block/report.
- **FR-071 (M)** Minor-contact rule: no adult→minor initiation; approaches
  route to guardian+academy thread; the minor's view is read-only until
  guardian approves participation.
- **FR-072 (M)** Retention & legal hold; export for disputes.

### 2.9 Verification & compliance (F-M, F-S)
- **FR-080 (M)** Verification cases: subject, evidence documents, reviewer,
  decision, expiry, revocation. Badge issuance emits event + hash anchor.
- **FR-081 (M)** KYC (persons) and KYB (orgs) via provider; agent licence
  field validated against imported FIFA licence list where applicable.
- **FR-082 (M)** Consent management: every processing purpose has a consent
  record (who, what, when, version); withdrawal workflows.
- **FR-083 (M)** Fraud signals: duplicate identity detection, image reuse,
  velocity rules, fake-club/agent heuristics feeding a review queue.

### 2.10 Blockchain anchoring (F-N, F-O)
- **FR-090 (M)** Anchor service computes SHA-256 of canonical record JSON,
  batches into a Merkle tree, publishes root on-chain; stores proof path.
- **FR-091 (M)** Any party with the record can verify inclusion + timestamp
  via public verifier endpoint.
- **FR-092 (2)** Smart contracts for mandate registry, milestone tracking,
  consent log per [blockchain.md](../02-architecture/blockchain.md).

### 2.11 Reputation (F-P)
- **FR-100 (2)** Trust score from verified activity, closed deals,
  counterparty ratings, conduct; visible factors; dispute freeze.

### 2.12 Admin (F-T)
- **FR-110 (M)** Queues: verification, flags, disputes, minor-safety
  escalations; SLAs and audit of admin actions.
- **FR-111 (M)** User/org lifecycle controls; document viewer with
  watermarking; analytics dashboards.

### 2.13 Search & AI
- **FR-120 (M)** Faceted search (players, academies, opportunities) with
  typo tolerance; permission-filtered at query time.
- **FR-121 (M)** Embedding-based similarity + rule filters for matching;
  "why matched" explanations.
- **FR-122 (2)** LLM scouting summaries and CV generation with human-visible
  provenance and edit-before-publish.

## 3. Non-functional requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-01 | Availability (core API) | 99.9% monthly (MVP), 99.95% at scale |
| NFR-02 | Latency | p95 read < 300ms, p95 write < 600ms (in-region) |
| NFR-03 | Low bandwidth | Core flows usable at 3G/256kbps; pages < 200KB critical path |
| NFR-04 | Devices | Android Go-class support; mobile-web first |
| NFR-05 | Scale | 1K → 10M users per scalability plan; no re-architecture before 1M |
| NFR-06 | Security | OWASP ASVS L2; SOC2-ready controls from day one |
| NFR-07 | Privacy | GDPR + Nigeria NDPR + POPIA ready; DSAR ≤ 30 days; privacy by default |
| NFR-08 | Minor safety | 100% of minor-reach features gated by guardian consent; safety queue SLA 4h |
| NFR-09 | Auditability | All sensitive mutations in append-only audit log; 7-year retention for deal records |
| NFR-10 | Data residency | Region-pinnable storage per tenant jurisdiction (Phase 2) |
| NFR-11 | Accessibility | WCAG 2.2 AA |
| NFR-12 | Localisation | i18n-ready; EN at MVP; FR/PT/AR next |
| NFR-13 | Recovery | RPO ≤ 5 min, RTO ≤ 1 h (see DR plan) |
| NFR-14 | Observability | 100% requests traced; SLO dashboards; error budgets |
| NFR-15 | Cost | Infra < $0.15/MAU/month at 100K MAU |

## 4. Assumptions & dependencies

- KYC/KYB vendor coverage across target African markets (Smile ID or
  equivalent) — hard dependency for verification SLAs.
- FIFA agent licence list obtainable as reference data (manual refresh
  acceptable in MVP).
- EVM L2 (e.g. Base or Polygon PoS) acceptable for anchoring; chain choice
  revisited before Phase 2 contracts.
- Video egress costs controlled via HLS + CDN; no 4K in MVP.

## 5. Out of scope (v1)

Payments processing, regulated investment execution, public tokens,
federation registry integration, live streaming, native mobile apps.
