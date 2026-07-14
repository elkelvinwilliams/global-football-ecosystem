# GFE — Security & Compliance Architecture

**Posture:** OWASP ASVS L2 now, L3 for auth/deal/consent flows; SOC 2
Type II-ready controls from day one; privacy by default. Threat model
headline: **we hold minors' identity data in markets rife with fraud — the
security story *is* the product.**

## 1. Identity assurance (KYC / KYB)

| Subject | Process | Provider strategy |
|---|---|---|
| Adults | Doc + liveness + face match; watchlist screening | Smile ID (African coverage) primary, Sumsub fallback via `KycPort` |
| Minors | **Never direct-KYC'd.** Guardian KYC + guardian-attested minor identity + academy attestation; DOB stored encrypted, age bands exposed |
| Organisations | Registry extract, UBO declaration, authorised-signatory proof, domain/social corroboration | Provider + manual review queue |
| Agents | KYC + licence evidence checked against imported FIFA licence data; expiry tracked, badges auto-revoke | Manual/import in MVP |

## 2. Access control

- **RBAC + relationship-based checks** (party-to-record) in one policy
  layer (`identity` module) consumed by REST, GraphQL and jobs alike.
- **Postgres RLS** as defence-in-depth on tenant-scoped tables.
- **Field-level privacy** on player profiles (owner-controlled visibility).
- Admin: separate IdP realm, hardware-key MFA mandatory, IP allowlist,
  just-in-time elevation with reason capture, all actions audited.
- Session security: rotating refresh tokens with reuse detection, device
  binding, step-up (WebAuthn) for signing/consent/payout actions.

## 3. Data protection

- TLS 1.3 everywhere; HSTS; internal mTLS in-cluster (mesh optional).
- At rest: storage-level encryption + **application-layer envelope
  encryption** for PII classes (DOB, documents, medical clearance) with
  per-subject data keys under KMS master keys → GDPR erasure by
  crypto-shredding.
- Documents: private buckets, presigned short-TTL URLs, per-org keys,
  optional dynamic watermarking on view ("viewed by X on date").
- Medical clearance data: permission-based, sealed class — visible only via
  explicit grant, never in search, never in exports, access logged
  individually.
- Secrets: cloud secret manager; no secrets in env files in prod; SOPS for
  IaC.

## 4. Minor protection (design constraints, not features)

1. No adult→minor contact initiation; approaches route to guardian+academy.
2. Guardian co-consent gates: publish profile, publish video, apply to
   trial, sign mandate.
3. Age never publicly precise (age bands); no school/address fields exist.
4. Mandates for minors: fee caps flagged, guardian signature mandatory,
   education-guarantee acknowledgement on cross-border trials.
5. Dedicated safety queue: 4h SLA, human review, escalation runbook,
   lawful-request procedure.
6. Anything increasing minor reach ships behind a flag + safety review.

## 5. Fraud & abuse detection

Signals engine (rules first, ML later — see AI doc): duplicate face/doc
reuse across accounts, impossible-velocity profile claims, fake-club
heuristics (registry mismatch, domain age, template photos), fake-agent
heuristics (licence mismatch, mandate spam, fee-structure red flags),
message-pattern grooming detection → review queue with severity routing.
Actions: shadow-limit, restrict, suspend; all reversible and audited.

## 6. Application & platform security

SSDLC: threat modelling per epic; deps scanning (Renovate + osv); SAST
(Semgrep) + secret scanning in CI; container scanning (Trivy); SBOM
(Syft) per release; signed images (cosign); IaC scanning (Checkov).
Runtime: WAF + bot management at edge, strict CSP, rate limiting, upload
antivirus (ClamAV lambda) + content-type sniffing, SSRF-safe fetchers,
webhook HMAC. Pentest before public launch; bug bounty at Phase 2.

## 7. Audit & tamper evidence

Append-only `AuditEvent` with hash chaining; daily chain-head anchored
on-chain (see blockchain doc) → the audit log itself is tamper-evident.
Sensitive reads (documents, medical, minors' records) are logged as events,
not just writes.

## 8. Incident response

Sev matrix (S1 data breach/minor-safety → 15 min ack, exec paging);
runbooks per class; breach notification workflow mapped to GDPR 72h and
local equivalents; quarterly tabletop exercises; post-incident reviews
public internally.

## 9. Security checklist (launch gate)

- [ ] ASVS L2 self-assessment complete; L3 items for auth/consent complete
- [ ] External pentest, criticals & highs closed
- [ ] KYC/KYB live in all launch markets; agent licence import current
- [ ] RLS enabled + tested on every tenant table (automated test suite)
- [ ] Envelope encryption + crypto-shred verified in staging DSAR drill
- [ ] Admin MFA hardware-key enforced; break-glass procedure tested
- [ ] Backups: restore drill passed (see DR); audit chain anchoring live
- [ ] Rate limits + WAF rules tuned with load test evidence
- [ ] Upload AV + media pipeline sandbox verified
- [ ] Minor-safety queue staffed; SLA dashboards live; grooming-pattern rules on
- [ ] Secrets rotated; no plaintext secrets in repo/CI (scan proof)
- [ ] Incident runbooks + on-call rota + status page live

## 10. Legal & compliance checklist

- [ ] Privacy: GDPR (EU users), **NDPR (Nigeria), POPIA (South Africa)**,
      Ghana DPA — ROPA, DPIAs (minors' data DPIA mandatory), DPO appointed,
      SCCs for cross-border transfers, DSAR tooling
- [ ] Children's data: guardian-consent records, age-assurance approach
      documented, no profiling of minors for ads (we run no ads)
- [ ] Terms: platform is an **introduction/records service** — not a payment
      institution, not an investment exchange, not a party to transfers
- [ ] Agent regulation: FIFA Football Agent Regulations alignment — licence
      display, fee-cap surfacing for minors, dispute referral pathways
- [ ] Investment marketplace (P2): structured as diligence/introductions;
      securities-law review per market before any transactional features
- [ ] Escrow/smart-contract payouts (P2): e-money/PSP licensing analysis per
      corridor; stablecoin escrow only where counsel signs off
- [ ] E-signature validity review per launch market (eIDAS-equivalent laws)
- [ ] Content/moderation policy incl. image rights and reporting channels
- [ ] Safeguarding policy published; staff vetting; mandatory training
- [ ] Insurance: cyber, E&O, D&O
