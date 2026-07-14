RLS policies are applied as raw SQL migrations alongside Prisma migrations.
Every tenant-scoped table gets: ENABLE ROW LEVEL SECURITY + policies keyed on
current_setting('gfe.user_id') / ('gfe.org_ids'). See docs/02-architecture/database.md.
