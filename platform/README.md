# GFE Platform

Production scaffold for the Global Football Ecosystem platform.
Architecture, schema and rationale live in [`/docs`](../docs/README.md).

## Layout

```
platform/
├── apps/
│   ├── api/          # NestJS (Fastify) modular monolith
│   └── web/          # Next.js 14 app (black/gold design system)
├── packages/
│   ├── db/           # Prisma schema (authoritative DB schema) + client
│   ├── ui/           # @gfe/ui component library
│   └── config/       # shared tsconfig/eslint presets
├── contracts/        # Solidity: AnchorRegistry, MandateRegistry (+ tests)
├── infra/terraform/  # AWS baseline (VPC, EKS, RDS, S3, CDN)
└── docker-compose.yml# local dev: postgres, redis, minio, meilisearch, anvil
```

## Quick start

```bash
corepack enable && pnpm install
docker compose up -d                 # local backing services
pnpm --filter @gfe/db prisma migrate dev
pnpm dev                             # api :4000, web :3000
```

## Conventions

- TypeScript strict everywhere; zod schemas shared between API and web.
- Domain modules never import each other's internals — application
  services + events only (see docs/02-architecture/system-architecture.md §4).
- Every POST handler honours `Idempotency-Key`.
- Anything touching minors requires a `safety-review` label before merge.
