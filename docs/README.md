# GFE Platform Documentation

Investor-grade foundations for the Global Football Ecosystem platform — the
trusted operating system of world football. This suite is written to Series A
diligence standard and maps 1:1 to the master build specification.

> The static marketing site lives at the repository root. The platform
> codebase scaffold lives in [`/platform`](../platform/). These documents are
> the source of truth for what gets built and why.

## Deliverable map

| # | Deliverable | Document |
|---|-------------|----------|
| 1 | Software Requirements Specification | [01-product/srs.md](01-product/srs.md) |
| 2 | Product Requirements Document | [01-product/vision-prd.md](01-product/vision-prd.md) |
| 3 | Technical Architecture | [02-architecture/system-architecture.md](02-architecture/system-architecture.md) |
| 4 | System Architecture Diagrams (Mermaid) | [02-architecture/system-architecture.md](02-architecture/system-architecture.md) |
| 5 | Database ERD | [02-architecture/database.md](02-architecture/database.md) |
| 6 | API Specification (OpenAPI) | [02-architecture/api.md](02-architecture/api.md) + [`platform/apps/api/openapi.yaml`](../platform/apps/api/openapi.yaml) |
| 7 | Authentication Flow | [02-architecture/api.md](02-architecture/api.md) |
| 8 | User Journey Maps | [03-design/ux.md](03-design/ux.md) |
| 9 | UX Wireframes | [03-design/ux.md](03-design/ux.md) |
| 10 | UI Component Library | [03-design/design-system.md](03-design/design-system.md) |
| 11 | Design System | [03-design/design-system.md](03-design/design-system.md) |
| 12 | Backend Folder Structure | [02-architecture/system-architecture.md](02-architecture/system-architecture.md) + [`platform/apps/api`](../platform/apps/api/) |
| 13 | Frontend Folder Structure | [`platform/apps/web`](../platform/apps/web/) |
| 14 | Mobile App Structure | [02-architecture/system-architecture.md](02-architecture/system-architecture.md) §10 |
| 15 | Infrastructure Architecture | [05-operations/infrastructure.md](05-operations/infrastructure.md) |
| 16 | Kubernetes Deployment Strategy | [05-operations/infrastructure.md](05-operations/infrastructure.md) §4 |
| 17 | CI/CD Pipeline | [05-operations/infrastructure.md](05-operations/infrastructure.md) §5 + [`.github/workflows/platform-ci.yml`](../.github/workflows/platform-ci.yml) |
| 18 | Security Architecture | [02-architecture/security.md](02-architecture/security.md) |
| 19 | Blockchain Architecture | [02-architecture/blockchain.md](02-architecture/blockchain.md) |
| 20 | Smart Contract Design | [02-architecture/blockchain.md](02-architecture/blockchain.md) §5 + [`platform/contracts`](../platform/contracts/) |
| 21 | Event-Driven Architecture | [02-architecture/system-architecture.md](02-architecture/system-architecture.md) §6 |
| 22 | Domain-Driven Design | [02-architecture/system-architecture.md](02-architecture/system-architecture.md) §4 |
| 23 | Service Boundaries | [02-architecture/system-architecture.md](02-architecture/system-architecture.md) §4 |
| 24 | Complete Database Schema | [`platform/packages/db/prisma/schema.prisma`](../platform/packages/db/prisma/schema.prisma) |
| 25 | API Endpoints | [02-architecture/api.md](02-architecture/api.md) §3 |
| 26 | Admin Dashboard Specification | [03-design/ux.md](03-design/ux.md) §7 |
| 27 | MVP Roadmap (12 weeks) | [06-business/roadmap.md](06-business/roadmap.md) §2 |
| 28 | Production Roadmap (24 months) | [06-business/roadmap.md](06-business/roadmap.md) §3 |
| 29–30 | Testing & QA Strategy | [05-operations/infrastructure.md](05-operations/infrastructure.md) §6 |
| 31 | Monitoring & Observability | [05-operations/infrastructure.md](05-operations/infrastructure.md) §7 |
| 32 | Disaster Recovery Plan | [05-operations/infrastructure.md](05-operations/infrastructure.md) §8 |
| 33 | Cost Estimates | [05-operations/infrastructure.md](05-operations/infrastructure.md) §9 |
| 34 | Scalability Plan | [05-operations/infrastructure.md](05-operations/infrastructure.md) §10 |
| 35 | Security Checklist | [02-architecture/security.md](02-architecture/security.md) §9 |
| 36 | Legal & Compliance Checklist | [02-architecture/security.md](02-architecture/security.md) §10 |
| 37 | Launch Strategy | [06-business/monetisation-gtm.md](06-business/monetisation-gtm.md) §4 |
| 38 | Investor Technical Appendix | [06-business/monetisation-gtm.md](06-business/monetisation-gtm.md) §5 |
| 39 | Engineering Task Breakdown | [06-business/roadmap.md](06-business/roadmap.md) §4 |
| 40 | GitHub Issues & Milestones | [06-business/roadmap.md](06-business/roadmap.md) §5 |
| 41 | Sprint Plan | [06-business/roadmap.md](06-business/roadmap.md) §6 |
| 42 | Codebase Scaffold | [`/platform`](../platform/) |
| — | AI Architecture | [04-ai/ai-architecture.md](04-ai/ai-architecture.md) |
| — | Monetisation & GTM | [06-business/monetisation-gtm.md](06-business/monetisation-gtm.md) |

## Reading order for investors

1. [Vision & PRD](01-product/vision-prd.md) — what we're building and for whom
2. [System architecture](02-architecture/system-architecture.md) — how it's built
3. [Security & compliance](02-architecture/security.md) — why it can be trusted with minors' data
4. [Roadmap](06-business/roadmap.md) — how we get to market in 12 weeks
5. [Monetisation & GTM](06-business/monetisation-gtm.md) — how it becomes a business
