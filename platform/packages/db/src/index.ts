import { PrismaClient } from "@prisma/client";

// Single shared client; RLS session variables are set per-request by the
// API's prisma middleware (see apps/api/src/common/prisma-rls.ts).
export const prisma = new PrismaClient();
export * from "@prisma/client";
